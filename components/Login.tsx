import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../hook'
import { setShowLoginModel, setUserInfo } from '../store/slice/commonSlice'
import { getCurrentUser, signIn } from '../api'

export default function Login () {
  let dispatch = useAppDispatch()
  const isVisible = useAppSelector(state => state.common.showLoginModel)

  const onFinish = async (values: any) => {
    console.log('Success:', values)
    try {
      let token = await signIn(values)
      message.success('登录成功')
      dispatch(setShowLoginModel(false))
      localStorage.setItem('jwt_token', token)

      let userInfo = await getCurrentUser()
      dispatch(setUserInfo(userInfo))
      form.resetFields()
    } catch (e) {
      // @ts-ignore
      message.error(e)
    }
  }

  const [form] = Form.useForm()
  const onFinishFailed = (errorInfo: any) => {
    message.error('输入错误')
  }
  return (
    <div>
      <Modal
        title={'登录'}
        visible={isVisible}
        onCancel={() => {
          dispatch(setShowLoginModel(false))
        }}
        onOk={onFinish}
        footer={null}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          //   initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="邮箱"
            name="username"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="flex justify-center text-center">
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
