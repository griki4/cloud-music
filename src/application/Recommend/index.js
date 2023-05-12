import React, {useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getBannerList, getRecommendList} from "./store/recommned"
//轮播图组件
import Slider from "../../components/slider"
import RecommendList from "../../components/list"
import {Content} from "./style"
import Scroll from "../../baseUI/scroll"
import {forceCheck} from 'react-lazyload'
import Loading from "../../baseUI/loading"

function Recommend() {

    //获取redux存储的数据
    const {bannerList, recommendList, enterLoading} = useSelector((state) => {
        return {
            bannerList: state.recommend.bannerList,
            recommendList: state.recommend.recommendList,
            enterLoading: state.recommend.enterLoading
        }
    })
    const dispatch = useDispatch()
    useEffect(() => {
        //简单数据缓存，减少网络请求
        if (!bannerList.length) {
            dispatch(getBannerList())
        }
        if (!recommendList.length) {
            dispatch(getRecommendList())
        }
    })

    return (
        <Content>
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList>
                </div>
            </Scroll>
            {enterLoading ? <Loading/> : null}
        </Content>
    )
}

export default React.memo(Recommend)
