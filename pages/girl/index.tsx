import {getCosplay, getGirls} from '../../api'
import PicList from '../../components/PicList'
import React from 'react'
import MyLayout from "../../components/MyLayout";

export default function Girl() {
    return <MyLayout>
        {process.browser ?
            <PicList getList={getGirls} path="cosplay"/> : null}
    </MyLayout>
}
