import {getCosplay, getPureGirls} from '../../api'
import PicList from '../../components/PicList'
import MyLayout from "../../components/Layout";

export default function PureGirl() {
    return <MyLayout>
        {process.browser ?
            <PicList getList={getPureGirls} path="cosplay"/> : null}
    </MyLayout>
}