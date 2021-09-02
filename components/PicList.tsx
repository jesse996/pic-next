import React, {forwardRef, useCallback, useEffect, useState} from 'react'
import {Button, Card, List, Image, Skeleton, message} from 'antd'
import Link from 'next/link'
import {PageReq, PageResp, Pic} from '../types'
import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeGrid as Grid} from 'react-window'
import {useGetSize} from '../utils'
import InfiniteLoader from 'react-window-infinite-loader'
import {EyeOutlined} from '@ant-design/icons'

// import Image from 'next/image'

interface Props {
    getList: (pageReq?: PageReq) => Promise<PageResp<Pic>>
    path: string,
    initData: Pic[],
    total: number
}

const PicList: React.FC<Props> = ({getList, path, initData, total}) => {
    const [notLoadingList, setList] = useState<Pic[]>(initData) //只包含加载完的
    const [cosplayList, setCosplayList] = useState<Pic[]>(initData)
    // const [totalCount, setTotalCount] = useState(0)
    //
    // //第一次加载数据
    // useEffect(() => {
    //     ;(async () => {
    //         // let data: PageResp<Pic> = await getCosplay({ page: 1, size: 30 })
    //         let data: PageResp<Pic> = await getList({current: 1, size})
    //         setCosplayList(data.records)
    //         setList(data.records)
    //         setTotalCount(data.total)
    //     })()
    // }, [getList])

    // eslint-disable-next-line react/display-name
    const innerElementType = forwardRef<any, any>(({style, ...rest}, ref) => (
        <div
            ref={ref}
            style={{
                ...style,
            }}
            {...rest}
        />
    ))

    //加载更多
    const loadMoreItems = async (startIndex: number, stopIndex: number) => {
        let SIZE = stopIndex - startIndex
        if (SIZE === 0) {
            return Promise.resolve()
        }
        let page = Math.floor(startIndex / SIZE) + 1

        let data: PageResp<Pic> = await getList({
            current: page,
            size: SIZE,
        })

        //没有更多数据
        if (data.records.length === 0) {
            message.info({
                content: '到底了~',
                duration: 3,
            })
            setCosplayList(notLoadingList)
        } else {
            setList(notLoadingList.concat(data.records))
            setCosplayList(notLoadingList.concat(data.records))
        }
    }

    //---
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })

    }, [])

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [onResize])

    //设置列数
    const [columnCount, setColumnCount] = useState(2)

    useEffect(() => {
        let widthWidth = size.width
        let colCount = 4
        if (widthWidth < 768) {
            colCount = 2
        }

        setColumnCount(colCount)
    }, [size])


    const isItemLoaded = (index: number) => !!cosplayList[index]

    const GUTTER_SIZE = 5

    const Cell = (props: any) => {
        const {columnIndex, rowIndex, style} = props
        let index = rowIndex * columnCount + columnIndex
        let item = cosplayList[index]
        return (
            <div
                key={index}
                style={{
                    ...style,
                    left: style.left + GUTTER_SIZE,
                    top: style.top + GUTTER_SIZE,
                    width: style.width - GUTTER_SIZE,
                    height: style.height - GUTTER_SIZE,
                }}
                className="overflow-hidden"
            >
                <Skeleton title={false} loading={item.loading}>
                    <Link href={`/${path}/${item.id}`} passHref={true}>
                        <Card
                            // style={{ height: '350px' }}
                            cover={
                                <div
                                    style={{height: '200px', display: 'flex'}}
                                    className="justify-center items-center max-w-full overflow-hidden  text-center"
                                >
                                    <Image
                                        src={item.coverImg}
                                        // layout={'fill'}
                                        alt={'img'}
                                        className={'object-cove'}
                                        // fallback="https://img95.699pic.com/xsj/0x/qx/8l.jpg!/fh/300"
                                        preview={false}
                                    />
                                    <div
                                        className=" flex justify-end items-center absolute bottom-0 right-0 w-full m-2">
                                        <EyeOutlined className="mr-2"/>
                                        {item.viewCount}
                                    </div>
                                </div>
                            }
                        >
                            <Card.Meta title={item.title} className="truncate  h-10"/>
                        </Card>
                    </Link>
                </Skeleton>
            </div>
        )
    }

    return (
        <>
            <div style={{height: 'calc(100vh - 64px)'}}>
                <AutoSizer>
                    {({height, width}) => (
                        <InfiniteLoader
                            isItemLoaded={isItemLoaded}
                            itemCount={total}
                            loadMoreItems={loadMoreItems}
                        >
                            {({onItemsRendered, ref}) => (
                                <Grid
                                    ref={ref}
                                    className="bg-gray-200"
                                    columnCount={columnCount}
                                    columnWidth={width / columnCount}
                                    height={height}
                                    width={width}
                                    rowCount={cosplayList.length / columnCount}
                                    rowHeight={290}
                                    innerElementType={innerElementType}
                                    onItemsRendered={(gridProps) => {
                                        onItemsRendered({
                                            overscanStartIndex:
                                                gridProps.overscanRowStartIndex * columnCount,
                                            overscanStopIndex:
                                                gridProps.overscanRowStopIndex * columnCount,
                                            visibleStartIndex:
                                                gridProps.visibleRowStartIndex * columnCount,
                                            visibleStopIndex:
                                                gridProps.visibleRowStopIndex * columnCount,
                                        })
                                    }}
                                >
                                    {Cell}
                                </Grid>
                            )}
                        </InfiniteLoader>
                    )}
                </AutoSizer>
            </div>
        </>
    )
}

export default PicList
