import React from "react";

import Home from "../Page/Home/Home";

function Main() {
    return (
        <div id="no-overflow">
            <div>
                <Home />
            </div>
        </div>
    );
};

function PrivateRouter() {
    return (
        <Main />
    );
}

export default PrivateRouter;