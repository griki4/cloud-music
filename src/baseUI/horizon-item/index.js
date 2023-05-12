import React, {useState, useRef, useEffect, memo} from 'react'
import {List, ListItem} from './style'
import Scroll from '../scroll'
import {PropTypes} from 'prop-types'

function Horizon(props) {
    const Category = useRef(null)
    //初始化内容宽度
    useEffect(() => {
        let CategoryDOM = Category.current
        let tagElems = CategoryDOM.querySelectorAll('span')
        let totalWidth = 0
        Array.from(tagElems).forEach(ele => {
            totalWidth += ele.offsetWidth
        })
        CategoryDOM.style.width = `${totalWidth}px`
    }, [])
    const {list, oldVal, title, handleClick} = props

    return (
        <Scroll direction={"horizontal"}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={`${oldVal === item.key ? 'selected' : ''}`}
                                    onClick={() => handleClick(item.key)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizon.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
}

Horizon.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
}
export default memo(Horizon)
