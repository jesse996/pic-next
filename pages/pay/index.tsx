import {getOrder, payPc, payWap} from 'api'
import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";

const PayPage = () => {
    const [content, setContent] = useState('创建订单中...')
    const [aliForm, setAliForm] = useState('')
    const router = useRouter()
    const {type, objId, amount, redirect, extra} = router.query


    useEffect(() => {
        ;(async () => {
            if (!(amount && type)) return router.replace('/')
            let {orderId} = await getOrder(+type, +amount * 100, Number(objId) || 0, extra as string || '')

            let r = redirect as string || window.location.href

            setContent('订单创建成功!')

            let isPc = screen.width > 765
            let form
            if (isPc) {
                form = await payPc(orderId, r)
            } else {
                form = await payWap(orderId, r)
            }
            console.log(form)
            setAliForm(form)
            setContent('跳转支付中...')
            document.forms[0].submit()
        })()
    }, [amount, objId, redirect, router, type])

    return (
        <div className="w-full h-96 bg-white flex justify-center items-center text-2xl text-gray-300">
            {content}
            {aliForm ? (
                <div dangerouslySetInnerHTML={{__html: aliForm}}/>
            ) : null}
        </div>
    )
}

export default PayPage
