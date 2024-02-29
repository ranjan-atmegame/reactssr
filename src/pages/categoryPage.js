import React, { useEffect, useState } from 'react';
import GameSsrHOC from '../hoc/gameSsr';
import { useParams } from 'react-router-dom';


function CategoryPage(props) {
    const { serverState } = props;
    const params = useParams();

    console.log(params, "clinet");

    const [state, setState] = useState(serverState);

    useEffect(() => {
        if (window.__INITIAL_STATE__ == null) {
            _fetchData()
        }
        window.__INITIAL_STATE__ = null;
    }, []);


    function _fetchData() {
        getApiResponse(props, false, (data) => {
            setState(data)
        })
    }

    console.log(state, "state")

    return (
        <div>
            CategoryPage
        </div>
    );
}




async function getApiResponse(props, flag, cb) {
    console.log(props, flag, 'server-side');

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    data.chunkJs = "CategoryPage"
    if (typeof cb === "function") {
        cb(data);
    }
}

CategoryPage.fetchData = function (props) {
    return new Promise((resolve) => {
        getApiResponse(props, true, (data) => {
            resolve(data);
        });
    })

}

export default GameSsrHOC(CategoryPage);

