import {UserInfo} from './../store/slice/commonSlice'
import {PageReq, Pic} from './../types/index'
import {get, post} from '../utils'

/**
 * 获取首页轮播图
 */
export function getCarousel() {
    return get('carousel')
}

/**
 *
 * @returns
 * @param pageReq
 * @param type
 */
export function getPicList(pageReq: PageReq, type: number) {
    return post('pic/list', {...pageReq, data: {type}})
}

/**
 * 获取图片详情
 * id:pic表的id
 */
export function getPicDetail(id: number): Promise<Pic> {
    return get(`/pic/${id}`)
}

/**
 * 获取cosplay
 */
export function getCosplay(pageReq?: PageReq) {
    return post('pic/list', {
        current: 1,
        size: 4,
        ...pageReq,
        data: {type: 2},
    })
}

/**
 * 获取少女日常
 */
export function getGirls(pageReq?: PageReq) {
    return post('pic/list', {
        current: 1,
        size: 4,
        ...pageReq,
        data: {type: 0},
    })
}

/**
 *
 * @returns
 * @param pageReq
 */
export function getPureGirls(pageReq?: PageReq):Promise<any> {
    return post('pic/list', {
        current: 1,
        size: 4,
        ...pageReq,
        data: {type: 3},
    })
}

/**
 * 获取资讯列表
 */
export function getNewsList(pageReq?: PageReq) {
    return post('news/list', pageReq)
}

/**
 * 获取资讯详情
 */
export function getNewsDetail(id: number) {
    return get(`news/${id}`)
}

/**
 * 搜索资讯
 */
export function search(keyword: string) {
    return get(`/news/search`, {keyword})
}

/**
 * pic浏览量
 */
export function getPicViewCount(id: number) {
    return get(`/viewCount/pic`, {id})
}

/**
 * pic浏览量
 */
export function getNewsViewCount(id: number) {
    return get(`/viewCount/news`, {id})
}

/**
 * 注册
 */
interface SignIn {
    username: string
    password: string
}

type SignUp = SignIn & { nickname: string }

export function signUp(data: SignUp) {
    return post('/user/signUp', data)
}

/**
 * 登录
 */
export function signIn(data: SignIn) {
    return post('/user/signIn', data)
}

/**
 *
 * @returns 登出
 */
export function logout() {
    return post('/user/logout')
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser(): Promise<UserInfo> {
    return get('/user')
}

export interface CommentReq {
    content: string
    toCommentId?: number
    objId: number
    type: number //0:news,1:pic
}

/**
 * 添加评论
 */
export function addComment(data: CommentReq) {
    return post('/comment', data)
}

export type CommentResp = {
    id: number
    userId: number
    userNickname: string
    createTime: string
    updateTime: string
} & CommentReq

/**
 * 获取评论,
 * type:  0:news ,1:pic
 */
export function getComment({type, objId}: { type: number, objId: Number }): Promise<CommentResp[]> {
    return get('/comment', {objId, type})
}

/**
 * 激活用户
 */
export function activate(token: string) {
    return get('/user/enable/' + token)
}

/**
 * 发送激活邮件
 */
export function sendActivateEmail() {
    return post('/user/sendActiveEmail')
}

/**
 * pc支付
 */
export function payPc(orderId: number, redirect: string) {
    return post('/pay/pc', {orderId, redirect})
}

/**
 * 手机支付
 */
export function payWap(orderId: number, redirect: string) {
    return post('/pay/wap', {orderId, redirect})
}

/**
 * 获取订单
 */
export function getOrder(type: number, targetId: number, amount: number) {
    return post('/pay/getOrder', {type, targetId, amount})
}
