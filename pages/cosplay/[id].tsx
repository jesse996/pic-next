import PicDetail from '../../components/PicDetail'
import React from 'react'
import MyLayout from "../../components/MyLayout";
import {useRouter} from "next/router";
import MyComment from "../../components/MyComment";

const CosplayDetail = () => {
    const router = useRouter()
    let {id} = router.query
    return <MyLayout>
        <PicDetail/>
        <MyComment type={1} objId={Number(id)}/>
    </MyLayout>
}
export default CosplayDetail
