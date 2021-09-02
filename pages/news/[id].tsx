import React, {useEffect, useState} from 'react'
import CosplayDetail from '../cosplay/[id]'
import {getCosplay, getNewsDetail, getNewsList, getPicDetail} from '../../api'
// import './News.css'
import {useRouter} from "next/router";
import MyLayout from "../../components/MyLayout";

import MyComment from '../../components/MyComment'
import {PageResp, Pic} from "../../types";
import {GetStaticProps} from "next";
import Pay from "../../components/Pay";
import {Spin} from "antd";


interface NewsResp {
    id: number
    coverUrl: string
    title: string
    description: string
    content: string
    likeCount?: number
    viewCount?: number
    commentCount?: number
}

export async function getStaticPaths() {
    let data: PageResp<NewsResp> = await getNewsList({current: 1, size: 20})
    let paths = data.records.map(i => ({params: {id: i.id.toString()}}))
    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log('params:', params)
    // @ts-ignore
    let data = await getNewsDetail(Number(params.id))
    return {
        props: {
            data
        }
    }
}

// @ts-ignore
export default function NewsDetail({data}) {
    const router = useRouter()
    if (router.isFallback) {
        return <Spin/>
    }
    const {id} = router.query

    return (
        <>
            <div
                id="news-root"
                className="w-full max-w-screen object-scale-down"
                dangerouslySetInnerHTML={{
                    __html: data?.content!,
                }}
            />
            <Pay/>
            <MyComment type={0} objId={Number(id)}/>
        </>
    )
}
