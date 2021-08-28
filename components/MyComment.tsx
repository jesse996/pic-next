import { addComment, CommentResp, getComment } from '../api'
import { useAppSelector } from '../hook'
import { setShowLoginModel } from '../store/slice/commonSlice'
import { UserOutlined } from '@ant-design/icons'
import { Button, Divider, Input, message, List } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  type: number
  objId: number
}
const MyComment = ({ type, objId }: Props) => {
  let userInfo = useAppSelector((state) => state.common.userInfo)
  let dispatch = useDispatch()
  const [content, setContent] = useState('')
  const [comments, setComments] = useState<CommentResp[]>([])
  const handleAddComment = async () => {
    if (content.trim() === '') {
      return message.error('请输入内容')
    } else {
      try {
        await addComment({ content, objId, type })
        message.success('评论成功')
        setContent('')
      } catch (e) {
        message.error('评论失败')
      }
    }
  }

  const fetchComment = useCallback( async () => {
    try {
      let comments = await getComment({ type, objId })
      setComments(comments)
    } catch (e) {
      console.log(e)
    }
  },[objId, type])

  useEffect(() => {
    ;(async () => {
      await fetchComment()
    })()
  }, [fetchComment])

  return (
    <>
      <div className="border-1  mt-10  bg-white">
        <div className="flex justify-between items-center p-4 text-gray-400 opacity-70">
          <div>{comments.length}条回复</div>
          <div className="text-sm ">
            请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。
          </div>
        </div>
        <Divider style={{ margin: 0 }} />
        {comments.length === 0 ? (
          <div className="p-4 text-center">暂无讨论，说说你的看法吧</div>
        ) : (
          // comments.map((i) => <div>{i}</div>)
          <List
            dataSource={comments}
            renderItem={(item) => (
              <List.Item>
                <div className="flex">
                  <div className="mx-5">
                    <Avatar icon={<UserOutlined></UserOutlined>}></Avatar>
                  </div>
                  <div>
                    <div className="text-base">{item.userNickname}</div>
                    <div className="text-lg">{item.content}</div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      <div className="mt-5 bg-white relative">
        <div className="flex justify-center p-5">
          <Avatar
            // style={{ backgroundColor: '#87d068' }}
            className="mr-4"
            icon={<UserOutlined />}
          />
          <Input.TextArea
            rows={4}
            value={content}
            onChange={(v) => {
              setContent(v.target.value)
            }}
          ></Input.TextArea>
        </div>
        <div className="text-right px-5 pb-2">
          <Button onClick={handleAddComment}>提交</Button>
        </div>

        {userInfo ? null : (
          <div className="absolute inset-0 bg-white opacity-90 m-auto flex flex-col justify-evenly items-center">
            <div>您必须登录或注册以后才能发表评论</div>
            <Button
              onClick={() => {
                dispatch(setShowLoginModel(true))
              }}
            >
              登录
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default MyComment
