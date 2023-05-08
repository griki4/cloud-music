import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getBannerRequest, getRecommendListRequest} from "../../../api/request"

const initialState = {
    bannerList: [],
    recommendList: [],
    enterLoading: true
}

export const getBannerList = createAsyncThunk(
    'getBannerListRequest',
    async (args, {dispatch}) => {
        const response = await getBannerRequest()
        dispatch(changeBannerAction(response.banners))
    })
export const getRecommendList = createAsyncThunk(
    'getRecommendListRequest',
    async (args, {dispatch}) => {
        const response = await getRecommendListRequest()
        dispatch(changeRecommendAction(response.result))
        //推荐歌单获取完毕之后关闭loading动画
        dispatch(changeLoadingAction())
    })
const recommendReducer = createSlice({
    name: 'recommend',
    initialState,
    reducers: {
        changeBannerAction(state, {payload}) {
            state.bannerList = payload
        },
        changeRecommendAction(state, {payload}) {
            state.recommendList = payload
        },
        changeLoadingAction(state, {payload}) {
            state.enterLoading = false
        }
    }
})
export const {changeBannerAction, changeRecommendAction, changeLoadingAction} = recommendReducer.actions
export default recommendReducer.reducer
