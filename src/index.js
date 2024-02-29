import React from "react";
import routes from "./routes";
import { Routes, Route } from "react-router";
import PropTypes from "prop-types";

export default function RouteIndex(props) {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element {...props} />} />
            ))}
        </Routes>
    )
}