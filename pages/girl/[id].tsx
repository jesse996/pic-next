import PicDetail from '../../components/PicDetail'
import React from 'react'
import MyLayout from "../../components/MyLayout";
import MyComment from "../../components/MyComment";
import {useRouter} from "next/router";
import {PageResp, Pic} from "../../types";
import {getCosplay, getGirls, getPicDetail} from "../../api";
import {GetStaticProps} from "next";

export async function getStaticPaths() {
    let data: PageResp<Pic> = await getGirls({current: 1, size: 200})
    let paths = data.records.map(i => ({params: {id: i.id}}))
    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}

// export async function getStaticProps({params}):GetStaticProps {
export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log('params:',params)
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
    const router =  useRouter()
    let {id}= router.query
    return <MyLayout>
        <PicDetail data={data}/>
        <MyComment type={1} objId={Number(id)} />
    </MyLayout>
}
