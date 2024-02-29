import React from "react";
import PropTypes from "prop-types";

export default function GameSsrHOC(Component) {
    const propTypes = {
        serverState: PropTypes.object,
    };
    let componentFetchData = Component.fetchData;
    Component = React.memo(Component);
    Component.fetchData = componentFetchData;
    class GameSsrHOC extends React.Component {
        static fetchData(props, cb) {
            let obj = Component.fetchData();
            if (obj && obj.constructor && obj.constructor.name === "Promise") {
                obj.then((data) => {
                    cb(data);
                });
            } else {
                cb(obj);
            }
        }

        constructor(props) {
            super(props);
            this.serverState = props.data || window.__INITIAL_STATE__;
        }

        componentDidMount() {
        }

        render() {
            return <Component serverState={this.serverState} {...this.props} />;
        }
    }

    GameSsrHOC.propTypes = propTypes;
    return GameSsrHOC;
}
