import {getOrder, payPc, payWap} from 'api'
import {useAppSelector} from 'hook'
import {DollarCircleOutlined} from '@ant-design/icons'
import {Button, Input, message} from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import aliImg from '../../assets/zfb.png'
import {useRouter} from "next/router";
import {router} from "next/client";

const PRICE_PER_MONTH = 10
const PayVip = ({showPay, setShowPay}: { showPay: boolean, setShowPay: (v:boolean) => void }) => {
    const [isEditAmount, setIsEditAmount] = useState(false)
    //月数
    const [amount, setAmount] = useState(1)
    const [payValue, setPayValue] = useState(PRICE_PER_MONTH)
    const [inputValue, setInputValue] = useState(2)
    const [checkValue, _] = useState(true)
    // const [showPay, setShowPay] = useState(false)

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

    useEffect(() => {
        setPayValue(amount * PRICE_PER_MONTH * (amount >= 6 ? 0.8 : 1))
    }, [amount])

    const handleClickAmount = useCallback((amount: number) => {
        setIsEditAmount(false)
        setAmount(amount)
    }, [])

    const handleChickEdit = useCallback(() => {
        setIsEditAmount(true)
        setAmount(inputValue)
    }, [inputValue])

    //点击支付
    const handlePay = useCallback(async () => {
        setShowPay(false)
        await router.push(`/pay?redirect=${location.href}&amount=${payValue}&extra=${amount}&type=3`)
    }, [amount, payValue])


    //购买月数
    const chooseList = [1, 6, 12]

    return (
        <>
            <Modal visible={showPay} onCancel={() => setShowPay(false)} footer={null}>
                <div className="text-center text-lg">充值vip</div>
                <div className="grid grid-cols-3 mx-5 py-3 ">
                    {chooseList.map((i) => (
                        <div
                            className={`flex justify-center items-center border py-2 hover:bg-red-100 cursor-pointer ${
                                amount === i ? 'bg-red-100' : ''
                            }`}
                            onClick={() => handleClickAmount(i)}
                            key={i}
                        >
                            <span>{i}个月</span>
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
                            <input
                                className="w-6 mx-2 outline-none border appearance-none"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            个月
                        </div>
                        <span className={` ${isEditAmount ? 'invisible' : 'visible'}`}>自定义</span>
                    </div>
                </div>
                <div className="flex justify-center items-center py-2">
                    <i className="text-lg">￥</i>
                    <span className="ml-1 text-2xl">{payValue}</span>
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
                        />
                        <img src={'/zfb.png'} width={70} alt={'ali'}/>
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
        </>
    )
}

export default PayVip
