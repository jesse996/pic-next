import {search} from '../../api'
import IconText from '../../components/IconText'
import {NewsResp} from '../../types'
import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons'
import {List, Skeleton} from 'antd'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from "next/router";
import Image from 'next/image'
import MyLayout from "../../components/MyLayout";

// eslint-disable-next-line react/display-name
export default () => {
    const router = useRouter()
    // let keyword = new URLSearchParams(useLocation().search).get('keyword')
    let keyword = router.query['keyword'] as string

    const [newsList, setNewsList] = useState<NewsResp[]>()

    useEffect(() => {
        ;(async () => {
            if (!keyword) return
            let data = await search(keyword)
            console.log(data)
            setNewsList(data)
        })()
    }, [keyword])
    return (
        <MyLayout>
            <div className="text-xl  mb-2">搜索结果：</div>
            <List
                itemLayout={'vertical'}
                size={'large'}
                dataSource={newsList}
                renderItem={(item: NewsResp, index: number) => (
                    <List.Item
                        style={{backgroundColor: '#fff'}}
                        key={index}
                        actions={[
                            <IconText
                                icon={StarOutlined}
                                text={item.likeCount || 0}
                                key="list-vertical-star-o"
                            />,
                            <IconText
                                icon={LikeOutlined}
                                text={item.likeCount || 0}
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={MessageOutlined}
                                text={item.commentCount || 0}
                                key="list-vertical-message"
                            />,
                        ]}
                        extra={
                            <Image width={272} height={150} alt="logo" src={item.coverImg}/>
                        }
                    >
                        <Skeleton avatar title={true} loading={item.loading} active>
                            <Link href={`/news/${item.id}`}>
                                <a>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={item.description}
                                    />
                                </a>
                            </Link>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </MyLayout>
    )
}
