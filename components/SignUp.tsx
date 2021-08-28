import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hook'
import {
  setShowLoginModel,
  setShowSignUpModel,
} from '../store/slice/commonSlice'
import { signUp } from '../api'

export default function SignUp() {
  let dispatch = useAppDispatch()

  const isVisible = useAppSelector((state) => state.common.showSignUpModel)
  const onFinish = async (values: any) => {
    console.log('Success:', values)
    try {
      let ok = await signUp(values)
      console.log(ok)
      message.success('注册成功！')
      dispatch(setShowSignUpModel(false))
      form.resetFields()
    } catch (e) {
      // @ts-ignore
      message.error(e)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()
  return (
    <Modal
      title={'注册'}
      visible={isVisible}
      onCancel={() => {
        dispatch(setShowSignUpModel(false))
      }}
      footer={null}
    >
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: '请输入昵称!' }]}
        >
          <Input />
        </Form.Item>
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
  )
}
