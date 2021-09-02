import PicList from "../../components/PicList";
import {getCosplay} from "../../api";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {PageResp, Pic} from "../../types";
import axios from "axios";

export const getStaticProps: GetStaticProps = async () => {
    // let data: PageResp<Pic> = await getCosplay({current: 1, size: 40})

    let data: PageResp<Pic> =  await getCosplay()
    console.log('data:', data)

    return {
        props: {
            initData: data.records,
            total: data.total
        }
    }
}

export default function Cosplay({initData, total}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <>{
        <PicList getList={getCosplay} path="cosplay" initData={initData} total={total}/>
    }</>

}