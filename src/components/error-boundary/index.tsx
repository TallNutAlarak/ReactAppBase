import React from "react";
import { Result, Button } from "antd";
import { withRouter } from "react-router";

class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true, error: error.message };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log("componentDidCatch");
        // 你同样可以将错误日志上报给服务器
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <Result
                    status="warning"
                    title="页面崩溃了"
                    subTitle={this.state.error}
                    extra={
                        <Button
                            onClick={() => {
                                const { history } = this.props;
                                history.replace("/");
                            }}
                        >
                            回到首页
                        </Button>
                    }
                ></Result>
            );
        }
        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);
