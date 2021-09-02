import {getCosplay, getNewsList, getPureGirls} from '../../api'
import PicList from '../../components/PicList'
import MyLayout from "../../components/MyLayout";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {NewsResp, PageResp} from "../../types";

export const getStaticProps: GetStaticProps = async () => {
    let data: PageResp<NewsResp> = await getNewsList({current: 1, size: 50})
    return {
        props: {
            data: data.records
        }
    }
}

export default function PureGirl({initData, total}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <>
        {process.browser ?
            <PicList getList={getPureGirls} path="cosplay" initData={initData} total={total}/> : null}
    </>
}