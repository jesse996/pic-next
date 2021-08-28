import {getGirls} from '../../api'
import PicList from '../../components/PicList'
import React from 'react'
import MyLayout from "../../components/Layout";

export default function Girl() {
    return <MyLayout><PicList getList={getGirls} path="girl"/></MyLayout>
}
