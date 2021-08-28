import PicList from "../../components/PicList";
import {getCosplay} from "../../api";
import MyLayout from "../../components/Layout";

export default function Cosplay() {
    return <MyLayout>
        <PicList getList={getCosplay} path="cosplay"/>
    </MyLayout>
}