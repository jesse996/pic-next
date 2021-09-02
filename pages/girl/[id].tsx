import PicDetail from '../../components/PicDetail'
import React from 'react'
import {useRouter} from "next/router";
import {PageResp, Pic} from "../../types";
import {getGirls, getPicDetail} from "../../api";
import {GetStaticProps} from "next";
import {Spin} from "antd";

export async function getStaticPaths() {
    let data: PageResp<Pic> = await getGirls({current: 1, size: 100})
    let paths = data.records.map(i => ({params: {id: i.id.toString()}}))
    return {
        paths,
        fallback: true
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log('params:', params)
    // @ts-ignore
    let data = await getPicDetail(Number(params.id))
    return {
        props: {
            data
        }
    }
}

// @ts-ignore
export default function GirlDetail({data}) {
    const router = useRouter()
    if (router.isFallback) {
        return <Spin/>
    }

    return <>
        <PicDetail data={data}/>
    </>
}
