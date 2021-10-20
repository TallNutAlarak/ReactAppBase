import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "@pages/login";
import { myContext } from "@store";
import Router from "@router";

import Layout from "@components/layout";

function App() {
    const { state } = useContext(myContext);
    return (
        <div className="w-screen h-screen">
            {state?.isLogin ? (
                <>
                    <Layout>
                        <Router></Router>
                    </Layout>
                </>
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
