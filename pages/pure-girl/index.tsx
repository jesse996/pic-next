import {getPureGirls} from '../../api'
import PicList from '../../components/PicList'
import MyLayout from "../../components/Layout";

export default function PureGirl() {
    return <MyLayout>
        <PicList getList={getPureGirls} path="pure-girl"/>
    </MyLayout>
}