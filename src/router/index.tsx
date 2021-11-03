import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "./routes";
import { appContext } from "@store";

const Router = () => {
    const { state } = useContext(appContext);
    return (
        <Switch>
            <Redirect exact from="/" to={routes[0].path}></Redirect>
            {routes.map((route) => {
                return (
                    <Route
                        exact
                        path={route.path}
                        component={route.component}
                    ></Route>
                );
            })}
            <Route
                path="/404"
                render={() => (
                    <div className="h-full w-full flex flex-col justify-center items-center text-3xl">
                        <div>404 NOT FOUND</div>
                        <div>找不到页面</div>
                    </div>
                )}
            ></Route>
            <Redirect to="/404"></Redirect>
        </Switch>
    );
};
export default Router;
