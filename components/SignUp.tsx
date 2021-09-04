import {Button, Form, Input, message, Modal} from 'antd'
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../hook'
import {
    setShowLoginModel,
    setShowSignUpModel,
} from '../store/slice/commonSlice'
import {sendActivateEmail, sendSignUpCode, signUp} from '../api'
import {use} from "ast-types";

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
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    //60秒只能发送一次
    const [leftTime, setLeftTime] = useState(-1)
    const [timer, setTimer] = useState<number>()
    //是否发过验证码
    const [hasSendEmail, setHasSendEmail] = useState(false)
    useEffect(() => {
        if (leftTime < 0) {
            clearInterval(timer)
            setHasSendEmail(true);
        }
    }, [leftTime, timer])
    /**
     * 发送注册验证码
     */
    const handleSendSignUpCode = async () => {
        let email = form.getFieldValue('username')
        console.log('email:', email)
        try {
            setLeftTime(6)
            let t = setInterval(() => {
                setLeftTime(t => t - 1)
            }, 1000);
            // @ts-ignore
            setTimer(t)
            await sendSignUpCode({email})

        } catch (e) {
            // console.log(e)
            clearInterval(timer)
            setLeftTime(-1)
        }
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
                labelCol={{span: 6}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="昵称"
                    name="nickname"
                    rules={[{required: true, message: '请输入昵称!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="username"
                    rules={[{required: true, message: '请输入邮箱!'}]}
                >
                    <div className={'flex justify-center'}>
                        <Input/>
                        <Button className={'ml-2 w-24'}
                                disabled={leftTime >= 0}
                                onClick={handleSendSignUpCode}>{leftTime >= 0 ? leftTime : (hasSendEmail ? '重新发送' : '发送验证码')}</Button>
                    </div>
                </Form.Item>
                <Form.Item
                    label="验证码"
                    name="code"
                    rules={[{required: true, message: '请输入验证码!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码!'}]}
                >
                    <Input.Password/>
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
