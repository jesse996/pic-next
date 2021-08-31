import {getOrder, payPc, payWap} from 'api'
import {useAppSelector} from 'hook'
import {DollarCircleOutlined} from '@ant-design/icons'
import {Button, Input, message} from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import aliImg from '../../assets/zfb.png'
import {useRouter} from "next/router";

const Pay = () => {
    const [aliForm, setAliForm] = useState('')
    const [isEditAmount, setIsEditAmount] = useState(false)
    const [amount, setAmount] = useState(2)
    const [inputValue, setInputValue] = useState(1)
    const [checkValue, setCheckValue] = useState(true)
    const [showPay, setShowPay] = useState(false)

    const router = useRouter();
    let {id} = router.query


    const doPayPc = async () => {
        window.open('/pay?redirect=' + location.href, '_blank')
    }

    useEffect(() => {
    }, [inputValue])
    const handleInputChange = (e: any) => {
        console.log(e.target.value)
        let v = e.target.value
        let re = /^[0-9]*$/
        if (!re.test(v)) {
            return
        }
        setInputValue(v)
        setAmount(v)
    }

    const doPayWap = async () => {
        window.open('/pay?redirect=' + location.href, '_blank')
    }

    const handleClickAmount = useCallback((amount: number) => {
        setIsEditAmount(false)
        setAmount(amount)
    }, [])

    const inputRef = useRef<HTMLInputElement>(null)

    const handleChickEdit = useCallback(() => {
        setIsEditAmount(true)
        setAmount(inputValue)
    }, [inputValue])

    //点击支付
    const handlePay = useCallback(async () => {
        setShowPay(false)
        await router.push(`/pay?redirect=${location.href}&amount=${amount}&objId=${id}&type=0`)
    }, [amount, id, router])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const moneyList = [2, 5, 10, 20, 50]

    return (
        <>
            <Modal visible={showPay} onCancel={() => setShowPay(false)} footer={null}>
                <div className="pl-3 pt-3">给妹子图打赏</div>
                <div className="text-center text-lg">请作者喝杯水吧~</div>
                <div className="grid grid-cols-3 mx-5 py-3 ">
                    {moneyList.map((i) => (
                        <div
                            className={`flex justify-center items-center border py-2 hover:bg-red-100 cursor-pointer ${
                                amount === i ? 'bg-red-100' : ''
                            }`}
                            onClick={() => handleClickAmount(i)}
                            key={i}
                        >
                            <DollarCircleOutlined className=""/>
                            <span>{i}元</span>
                        </div>
                    ))}

                    <div
                        className={`flex justify-center items-center border py-2 hover:bg-red-100 cursor-pointer ${
                            amount === inputValue ? 'bg-red-100' : ''
                        }`}
                        onClick={handleChickEdit}
                    >
                        <div
                            className={`max-w-full  flex items-center ${
                                isEditAmount ? 'block' : 'hidden'
                            }`}
                        >
                            <DollarCircleOutlined className=""/>
                            <input
                                ref={inputRef}
                                className="w-6 mx-2 outline-none border appearance-none"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            元
                        </div>
                        <span
                            className={`absolute ${isEditAmount ? 'invisible' : 'visible'}`}
                        >
              自定义
            </span>
                    </div>
                </div>
                <div className="flex justify-center items-center py-2">
                    <i className="text-lg">￥</i>
                    <span className="ml-1 text-2xl">{amount}</span>
                </div>

                {/* 选择支付宝 */}
                <div className="flex flex-col justify-center items-center px-5">
                    <div
                        className="w-full  text-center border mx-5 px-4 py-3 cursor-pointer flex justify-center items-center ">
                        <input
                            type="checkbox"
                            checked={checkValue}
                            onChange={() => {
                            }}
                            className="mr-2"
                        ></input>
                        <img src={'/zfb.png'} width={70} alt={'ali'}></img>
                    </div>
                    <div className="w-full ">
                        <Button
                            type="primary"
                            block
                            size="large"
                            className="my-4 px-5"
                            onClick={handlePay}
                        >
                            确定支付
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className="bg-yellow-50 flex justify-between items-center py-3 px-5 md:px-8 mt-2">
                <div className="flex flex-col justify-start items-start">
                    <span className="text-lg">点点赞赏，手留余香</span>
                    <span className="text-lg">请我喝杯水吧！</span>
                </div>
                <button
                    onClick={() => setShowPay(true)}
                    className="hidden md:block bg-red-400 px-3 py-2 text-base text-white visited:text-white"
                >
                    赞赏
                </button>
                <button
                    onClick={() => {
                        setShowPay(true)
                    }}
                    className="md:hidden bg-red-400 px-3 py-2 text-base text-white visited:text-white"
                >
                    赞赏
                </button>
            </div>
            {aliForm ? (
                <div dangerouslySetInnerHTML={{__html: aliForm}}></div>
            ) : null}
        </>
    )
}

export default Pay
