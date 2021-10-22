import {getGirls} from '../../api'
import PicList from '../../components/PicList'
import React from 'react'
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {PageResp, Pic} from "../../types";

export const getStaticProps: GetStaticProps = async () => {
    let data: PageResp<Pic> = await getGirls({current: 1, size: 40})

    return {
        props: {
            initData: data.records,
            total: data.total
        }
    }
}
export default function Girl({initData, total}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <>
        <PicList getList={getGirls} path="girl" initData={initData} total={total}/>
    </>
}
