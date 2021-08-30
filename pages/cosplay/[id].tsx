import PicDetail from '../../components/PicDetail'
import React from 'react'
import MyLayout from "../../components/MyLayout";
import {useRouter} from "next/router";
import MyComment from "../../components/MyComment";
import {getCosplay, getPicDetail} from "../../api";
import {PageResp, Pic} from "../../types";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

export async function getStaticPaths() {
    let data: PageResp<Pic> = await getCosplay({current: 1, size: 500})
    let paths = data.records.map(i => {
        return {params: {id: i.id.toString()}}
    })
    // console.log('paths:',paths)
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
            picDetail: data
        }
    }
}

// @ts-ignore
const CosplayDetail = ({picDetail}) => {
    const router = useRouter()
    let {id} = router.query
    return <MyLayout>
        {router.isFallback ? <div>loading..,</div> :
            <><PicDetail data={picDetail}/>
                <MyComment type={1} objId={Number(id)}/>
            </>}
    </MyLayout>
}
export default CosplayDetail
