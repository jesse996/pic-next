import React, {useEffect, useState} from 'react'
import {Button, Divider, Image, Space, Spin} from 'antd'
import {EyeTwoTone, LikeTwoTone} from '@ant-design/icons'
import {Pic} from '../types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import {useAppDispatch, useAppSelector} from '../hook'
import {setShowLoginModel} from '../store/slice/commonSlice'
import {getPicDetail} from '../api'
import {useRouter} from "next/router";
import MyComment from "./MyComment";
import Pay from "./Pay";
// import PayVip from "./PayVip";
import dynamic from "next/dynamic";
// import Image from 'next/image'
// eslint-disable-next-line react/display-name
const PayVip = dynamic(() => import('./PayVip'), {ssr: false, loading: () => <Spin/>})


dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const PicDetail = ({data}: { data: Pic }) => {
    // let detail = data
    const [detail, setDetail] = useState(data)
    const [showPayVip, setShowPayVip] = useState(false)
    let viewCount = detail?.viewCount
    let userInfo = useAppSelector((state) => state.common.userInfo)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!userInfo) {
            setDetail({...detail, imgList: detail.imgList.slice(0, 5)});
        }
    }, [userInfo, detail])

    const formatTime = (time?: string) => {
        if (!time) return ''
        let day = dayjs(time)
        return day.fromNow()
    }

    return (
        <>
            <div className={'p-1 bg-white max-w-full w-full'}>
                <div className="m-3 text-2xl font-bold">{detail?.title}</div>
                <div className="m-3 mb-0">
                    {/* {detail?.createTime.split('T')[0]} */}
                    {formatTime(detail?.createTime)}
                    <EyeTwoTone className="ml-3 mr-1"/>
                    <span className="text-xs text-gray-500">{viewCount}</span>
                </div>
                <Divider style={{marginBottom: 5, marginTop: 1}}/>
                <div dangerouslySetInnerHTML={{__html: detail?.description!}}/>

                <div className="w-full flex flex-col justify-center items-center relative">
                    {detail?.imgList?.map((i) => (
                        <Image
                            key={i}
                            src={i}
                            // layout={'fill'}
                            alt={'img'}
                            preview={false}
                            className="flex flex-col justify-center items-center"
                            placeholder={
                                <div className="text-center">
                                    <Spin/>
                                </div>
                            }
                        />
                    ))}

                    {/* ???????????????????????? */}
                    {userInfo ? null : (
                        <div
                            className="absolute bottom-0 left-0 right-0  m-auto w-full h-32 text-center text-3xl bg-white opacity-75 flex justify-center items-center cursor-pointer"
                            onClick={() => {
                                return dispatch(setShowLoginModel(true))
                            }}
                        >
                            <div>??????????????????</div>
                        </div>
                    )}

                    {/* ???vip??????????????? */}
                    {!userInfo || userInfo.isVip ? null : (
                        <div
                            className="absolute bottom-0 left-0 right-0  m-auto w-full h-32 text-center text-3xl bg-white opacity-75 flex justify-center items-center cursor-pointer"
                            onClick={() => {
                                setShowPayVip(true)
                            }}
                        >
                            <div>??????????????????</div>
                        </div>
                    )}
                </div>
            </div>

            <Pay/>
            <PayVip showPay={showPayVip} setShowPay={setShowPayVip}/>

            {/* ?????? */}
            <MyComment type={1} objId={data.id}/>
        </>
    )
}
export default PicDetail
