import React from "react";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";
import {Tab, TabItem, Top} from "./style";

function Home(props) {
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title"></span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <Tab>
                {/*NavLink进行路由跳转*/}
                <NavLink to="/recommend"><TabItem><span> 推荐 </span></TabItem></NavLink>
                <NavLink to="/singers"><TabItem><span> 歌手 </span></TabItem></NavLink>
                <NavLink to="/rank"><TabItem><span> 排行榜 </span></TabItem></NavLink>
            </Tab>
            <Outlet/>
        </div>

    )
}

export default React.memo(Home)
