import {getPureGirls} from '../../api'
import PicList from '../../components/PicList'
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {PageResp, Pic} from "../../types";

export const getStaticProps: GetStaticProps = async () => {
    let data: PageResp<Pic> = await getPureGirls({current: 1, size: 50})
    return {
        props: {
            data: data.records,
            total:data.total
        }
    }
}

export default function PureGirl({initData, total}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <>
        <PicList getList={getPureGirls} path="pure-girl" initData={initData} total={total}/>
    </>
}