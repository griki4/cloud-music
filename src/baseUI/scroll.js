import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react"
import BScroll from "better-scroll"
import PropTypes from "prop-types"
import styled from "styled-components"

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

//forwardRef让函数式组件具备被上层组件调用的能力
const Scroll = forwardRef((props, ref) => {
    //better-scroll的实例对象
    const [bScroll, setBScroll] = useState()
    //初始化bs对象所需要的DOM实例
    const scrollContainerRef = useRef()

    //获取外界传递的参数
    const {direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom} = props;
    const {pullUp, pullDown, onScroll} = props;

    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === "horizontal",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])

    //每次重新渲染的时候都需要refresh防止无法滚动
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    })

    //绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll)
        })
        return () => {
            bScroll.off('scroll')
        }
    }, [onScroll, bScroll])

    //上拉到底判断
    useEffect(() => {
        if (!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUp();
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [pullUp, bScroll]);

    //下拉到底判断
    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDown()
            }
        });
        return () => {
            bScroll.off('touchEnd')
        }
    }, [pullDown, bScroll])

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh()
                bScroll.scrollTo(0, 0)
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll
            }
        }
    }))

    return (
        <ScrollContainer ref={scrollContainerRef}>
            {props.children}
        </ScrollContainer>
    )
})

//设置该组件参数的默认值
Scroll.defaultProps = {
    direction: 'vertical',//滚动方向
    click: true,//是否支持点击
    refresh: true,//是否可以刷新
    onScroll: null,//触发滚动的回调
    pullUpLoading: false,//显示上拉加载动画
    pullDownLoading: false,//显示下拉加载动画
    pullUp: null,
    pullDown: null,//上拉和下拉的加载逻辑
    bounceTop: true,
    bounceBottom: true //向上和向下的吸顶
}

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向上吸顶
}

export default Scroll

