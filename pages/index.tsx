import React, {useEffect, useState} from 'react'
import {Card, Carousel, Image} from 'antd'
import Link from 'next/link'
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'
import {
    getCarousel,
    getCosplay,
    getGirls,
    getNewsList,
    getPureGirls,
} from '../api'
import {NewsResp, PageResp, Pic} from '../types'

import {EyeOutlined, RightOutlined} from '@ant-design/icons'
import MyLayout from "../components/Layout";
import NewsList from '../components/NewsList'


interface Carousel {
    id: number
    url: string
    href: string
    title: string
}

const {Meta} = Card

export const getServerSideProps: GetServerSideProps = async (context) => {
    let data: PageResp<Pic> = await getCosplay()
    let cosplayList: Pic[] = data.records

    data = await getPureGirls()
    let pureGirlList: Pic[] = data.records

    data = await getGirls()
    let girlList = data.records

    let news: PageResp<NewsResp> = await getNewsList({
        current: 1,
        size: 2,
    })
    let newsList = news.records

    return {
        props: {
            cosplayList,
            pureGirlList,
            girlList,
            newsList
        },
    }
}
const Index = ({
                   cosplayList,
                   pureGirlList,
                   girlList,
                   newsList
               }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    /**
     * 图片展示组件
     */
    const IndexImgList = ({path, list}: { path: string; list: Pic[] }) => (
        <div className={'grid grid-cols-2 md:grid-cols-4 gap-2'}>
            {list?.map((i) => (
                <Link href={`/${path}/${i.id}`} key={i.id}>
                    <a>
                        <Card
                            hoverable={true}
                            cover={
                                <div
                                    style={{height: '200px', display: 'flex'}}
                                    className="justify-center items-center max-w-full overflow-hidden  text-center"
                                >
                                    <Image
                                        alt={''}
                                        className={'object-cove'}
                                        fallback="https://img95.699pic.com/xsj/0x/qx/8l.jpg!/fh/300"
                                        src={i.coverImg}
                                        preview={false}
                                    />
                                    <div
                                        className=" flex justify-end items-center absolute bottom-0 right-0 w-full mt-2 mr-2">
                                        <EyeOutlined className="mr-2"/>
                                        {i.viewCount}
                                    </div>
                                </div>
                            }
                        >
                            <Meta title={i.title}/>
                        </Card>
                    </a>
                </Link>
            ))}
        </div>
    )

    /**
     * 标题组件
     */
    const MyTitle = ({title, path}: { title: string; path: string }) => (
        <div className="flex justify-between items-center mt-5 mb-2">
            <div className="text-2xl md:text-4xl">{title}</div>
            <Link href={`/${path}`}>
                <a className="text-base hover:text-blue-300  cursor-pointer antialiased">
                    <span>查看更多</span>
                    <RightOutlined/>
                </a>
            </Link>
        </div>
    )

    return (
        <MyLayout>
            <MyTitle title="COSPLAY" path={'cosplay'}/>
            <IndexImgList list={cosplayList} path="cosplay"/>

            <MyTitle title="清纯少女" path={'pure-girl'}/>
            <IndexImgList list={pureGirlList} path="pure-girl"/>

            <MyTitle title="性感妹子" path={'girl'}/>
            <IndexImgList list={girlList} path="girl"/>

            <MyTitle title="最新资讯" path="news"/>
            <NewsList count={10}/>
        </MyLayout>
    )
}

export default Index
