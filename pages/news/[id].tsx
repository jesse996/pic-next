import React, {useEffect, useState} from 'react'
import CosplayDetail from '../cosplay/[id]'
import {getNewsDetail} from '../../api'
// import './News.css'
import {useRouter} from "next/router";
import MyLayout from "../../components/MyLayout";

import MyComment from '../../components/MyComment'


interface NewsResp {
    id: number
    coverUrl: string
    title: string
    description: string
    content: string
    likeCount?: number
    viewCount?: number
    commentCount?: number
}

export default function NewsDetail() {
    // const { id } = useParams<{ id: string }>()
    const {id} = useRouter().query
    // if (!id) return <div>not exist</div>
    
    const [news, setNews] = useState<NewsResp>()
    useEffect(() => {
        ;(async () => {
            let data: NewsResp = await getNewsDetail(+id!)
            setNews(data)
        })()
    }, [id])

    return (
        <MyLayout>
            <div
                id="news-root"
                className="w-full max-w-screen object-scale-down"
                dangerouslySetInnerHTML={{
                    __html: news?.content!,
                }}
            />
            {/*<Pay></Pay>*/}
            <MyComment type={0} objId={Number(id)} />
        </MyLayout>
    )
}
