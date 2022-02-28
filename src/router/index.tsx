import { useContext, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from './routes';
import { appContext } from '@store';
import ErrorBoundary from '@components/error-boundary';
import { Result, Spin } from 'antd';

const Router = () => {
    const { state } = useContext(appContext);
    return (
        <Suspense
            fallback={
                <Spin tip='正在加载...' size='large' wrapperClassName='h-full w-full'>
                    <div className='h-full w-full'></div>
                </Spin>
            }
        >
            <Switch>
                <Redirect exact from='/' to={routes[0].path}></Redirect>
                {routes.map((route) => {
                    return (
                        <Route
                            key={route.path}
                            exact
                            path={route.path}
                            component={() => (
                                <ErrorBoundary>
                                    <route.component></route.component>
                                </ErrorBoundary>
                            )}
                        ></Route>
                    );
                })}
                <Route path='/404' render={() => <Result status='404' title='找不到该页面'></Result>}></Route>
                <Redirect to='/404'></Redirect>
            </Switch>
        </Suspense>
    );
};
export default Router;
