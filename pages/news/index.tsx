import NewsList from "../../components/NewsList";
import MyLayout from "../../components/MyLayout";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {getNewsList, getPicDetail} from "../../api";
import {NewsResp, PageResp} from "../../types";

export const getStaticProps: GetStaticProps = async () => {
    let data: PageResp<NewsResp> = await getNewsList({current: 1, size: 50})
    return {
        props: {
            data: data.records
        }
    }
}

export default function News({data}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <>
        <NewsList data={data}/>
    </>
}
