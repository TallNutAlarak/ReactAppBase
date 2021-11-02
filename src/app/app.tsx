import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";


import Login from "@pages/login";
import { appContext } from "@store";
import Router from "@router";

import Layout from "@layout";

function App() {
    const { state } = useContext(appContext);
    return (
        <div className="w-screen h-screen">
            {state?.isLogin ? (
                <Switch>
                    <Route
                        key="/login"
                        exact
                        path="/login"
                        component={Login}
                    ></Route>
                    <Layout>
                        <Router></Router>
                    </Layout>
                </Switch>
            ) : (
                <Switch>
                    <Route
                        key="/login"
                        exact
                        path="/login"
                        component={Login}
                    ></Route>
                    <Redirect to="/login"></Redirect>
                </Switch>
            )}
        </div>
    );
}

export default App;
