import express from "express";
import path from "path";
import { renderToString } from "react-dom/server";
import React, { Component } from "react";
import { StaticRouter } from "react-router-dom/server";
import routes from "./routes";
import PropTypes from 'prop-types';
import Layout from "./Layout";
import RouteIndex from "./index";

const app = express();

class DataProvider extends Component {
    static contextTypes = {
        data: PropTypes.object,
        routerData: PropTypes.object
    };
    render() {
        return (
            <StaticRouter location={this.props.location}>
                <RouteIndex {...this.props} />
            </StaticRouter>
        );
    }
}

app.use("/", express.static(path.join(__dirname, 'static')));

function extractParams(url, path) {
    const urlParts = url.split('/');
    const pathParts = path.split('/');
    const params = {};
    for (let i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i];
        if (pathPart.startsWith(':')) {
            const paramName = pathPart.slice(1);
            params[paramName] = urlParts[i];
        }
    }
    return params;
}

app.get('/*', async (req, res) => {
    console.log("coming");
    try {
        for (const route of routes) {
            const { path } = route;
            const params = extractParams(req.url, path);
            console.log(route, route.element().fetchData, "route>>>>>>>>>>>>")
            if (Object.keys(params).length > 0) {
                if (route.fetchData) {
                    route.fetchData(req, function (data) {
                        console.log(data, "data-chunk")
                        renderHtml(data, req.url, req, res);
                    })
                }
            }
        }
    } catch (error) {
        console.error('Error rendering component:', error);
        res.status(500).send('Internal Server Error');
    }
});




let renderHtml = function (data, location, req, res) {
    data.headers = req.headers;
    data.params = req.params;
    let chunkJs = data.chunkJs;
    const html = renderToString(
        <Layout><DataProvider data={data} location={location} /></Layout>
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Link', `${data.preloadBanner ? `<${data.preloadBanner}>;rel="preload";as="image",` : ""}`);

    res.write('<!DOCTYPE html><html lang="en" itemscope itemtype="http://schema.org/WebPage">');
    var strBody = `<body class="Language Smooth">`;
    strBody += '<div id="root">';
    res.write(strBody);
    res.write(html);
    var renderedFoot = '<script>window.__INITIAL_STATE__ = ' + JSON.stringify(data) + '; </script>';
    renderedFoot += '<script src="/js/bundle.js"></script>';
    renderedFoot += '<script src="/js/'+chunkJs+'.chunk.js">';
    var htmlContent = renderedFoot + '</div></body></html>';
    res.end(htmlContent);
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});




