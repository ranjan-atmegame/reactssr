import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GameSsrHOC from '../hoc/gameSsr';

function HomePage(props) {
    const { serverState } = props;
    const [state, setState] = useState(serverState);

    useEffect(() => {
        if (window.__INITIAL_STATE__ == null) {
            _fetchData()
        }
        window.__INITIAL_STATE__ = null;
    }, []);


    function _fetchData() {
        getApiResponse(props, (data) => {
            setState(data);
        })
    }

    return (
        <div>
            Home Page
            <Link to="/category">category</Link>
        </div>
    );
}




async function getApiResponse(props, cb) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    data.chunkJs = "homePage"
    if (typeof cb === "function") {
        cb(data);
    }
}

HomePage.fetchData = function (props) {
    return new Promise((resolve) => {
        getApiResponse(props, (data) => {
            resolve(data);
        });
    })

}

export default GameSsrHOC(HomePage);
