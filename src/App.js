import React from "react";
//覆盖浏览器的默认样式
import {GlobalStyle} from "./style";
//设置图标样式
import {IconStyle} from "./assets/iconfont/iconfont";

//引入路由
import {HashRouter} from "react-router-dom";
import {useRoutes} from "react-router";
import routes from "./routes";

//引入redux
import {Provider} from "react-redux";
import store from "./store/index"

const Pages = () => {
    return useRoutes(routes)
}

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <GlobalStyle></GlobalStyle>
                <IconStyle></IconStyle>
                {<Pages/>}
            </HashRouter>
        </Provider>
    );
}

export default App;
