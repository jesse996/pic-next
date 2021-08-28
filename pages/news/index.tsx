import React, {useEffect, useState} from 'react'
import {Button, List, Skeleton, Space, Image} from 'antd'
import {EyeOutlined, LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons'
import Link from 'next/link'
import {getNewsList} from '../../api'
import {NewsResp, PageResp} from '../../types'
import IconText from '../../components/IconText'
import MyLayout from "../../components/Layout";

interface Props {
    count?: number
}

const loadMoreCount = 10

export default function NewsList({count}: Props) {
    const [newsList, setNewsList] = useState<NewsResp[]>([])
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState<NewsResp[]>([])
    useEffect(() => {
        ;(async () => {
            let data: PageResp<NewsResp> = await getNewsList({
                current: 1,
                size: count || 20,
            })
            let res = data.records
            setNewsList(res)
            setList(res)
            setInitLoading(false)
        })()
    }, [])

    const onLoadMore = async () => {
        setNewsList((newsList) =>
            newsList.concat([...Array(count)].map(() => ({loading: true} as any)))
        )
        setLoading(true)

        const page = (newsList.length || 1) / loadMoreCount + 1
        let data: PageResp<NewsResp> = await getNewsList({
            current: page,
            size: loadMoreCount,
        })

        setList(list.concat(data.records))
        setNewsList(list.concat(data.records))
        setLoading(false)
    }

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>加载更多</Button>
            </div>
        ) : null

    return (
        <MyLayout>
            <List
                itemLayout={'vertical'}
                loadMore={loadMore}
                loading={initLoading}
                size={'large'}
                dataSource={newsList}
                renderItem={(item: NewsResp, index: number) => (
                    <List.Item
                        style={{backgroundColor: '#fff'}}
                        key={index}
                        actions={[
                            <IconText
                                icon={EyeOutlined}
                                text={item.viewCount || 0}
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
                            <Image
                                width={272}
                                height={150}
                                fallback="https://img95.699pic.com/xsj/0x/qx/8l.jpg!/fh/300"
                                alt=""
                                preview={false}
                                className="object-cover"
                                src={item.coverImg}
                            />
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
