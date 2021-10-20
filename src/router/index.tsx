import { Switch, Route, Redirect } from "react-router-dom";
import TestPage from "@pages/test-page";

const Router = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/test"></Redirect>
            <Route exact path="/test" component={TestPage}></Route>
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
