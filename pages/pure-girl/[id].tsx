import PicDetail from '../../components/PicDetail'
import React from 'react'
import MyLayout from "../../components/MyLayout";
import MyComment from "../../components/MyComment";
import {useRouter} from "next/router";
import {PageResp, Pic} from "../../types";
import {getPicDetail, getPureGirls} from "../../api";
import {GetStaticProps} from "next";
import {Spin} from "antd";

export async function getStaticPaths() {
    let data: PageResp<Pic> = await getPureGirls({current: 1, size: 100})
    let paths = data.records.map(i => ({params: {id: i.id.toString()}}))
    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
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
    if (router.isFallback){
        return <Spin/>
    }

    return <MyLayout>
        <PicDetail data={data}/>
    </MyLayout>
}
