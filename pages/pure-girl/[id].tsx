import PicDetail from '../../components/PicDetail'
import React from 'react'
import MyLayout from "../../components/MyLayout";
import MyComment from "../../components/MyComment";
import {useRouter} from "next/router";

export default function GirlDetail() {
    const router =  useRouter()
    let {id}= router.query
    return <MyLayout>
        <PicDetail />
        <MyComment type={1} objId={Number(id)} />
    </MyLayout>
}
