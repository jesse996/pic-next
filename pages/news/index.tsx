import NewsList from "../../components/NewsList";
import MyLayout from "../../components/MyLayout";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {getNewsList, getPicDetail} from "../../api";

export const getStaticProps: GetStaticProps = async () => {
    let data = await getNewsList()
    return {
        props: {
            data
        }
    }
}

export default function News({data}:InferGetStaticPropsType<typeof getStaticProps>) {
    return <MyLayout>
        <NewsList data={data}/>
    </MyLayout>
}
