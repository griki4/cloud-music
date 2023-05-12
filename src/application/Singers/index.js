import React, {useState} from "react"
import Horizon from '../../baseUI/horizon-item/index.js'
import {categoryTypes, alphaTypes} from "../../api/config"
import {NavContainer} from "./style"

function Singers() {
    let [category, setCategory] = useState('')
    let [alpha, setAlpha] = useState('')

    function handleUpdateCategory(value) {
        setCategory(value)
    }

    function handleUpdateAlpha(value) {
        setAlpha(value)
    }

    return (
        <NavContainer>
            <Horizon
                list={categoryTypes}
                title={"分类 (默认热门):"}
                oldVal={category}
                handleClick={handleUpdateCategory}
            ></Horizon>
            <Horizon
                list={alphaTypes}
                title={"首字母:"}
                oldVal={alpha}
                handleClick={handleUpdateAlpha}
            ></Horizon>
        </NavContainer>
    )
}

export default React.memo(Singers)
