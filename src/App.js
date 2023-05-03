import React from "react";
//覆盖浏览器的默认样式
import { GlobalStyle } from "./style";
//设置图标样式
import { IconStyle } from "./assets/iconfont/iconfont";

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;
