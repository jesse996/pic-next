import PicList from "../../components/PicList";
import {getCosplay} from "../../api";
import MyLayout from "../../components/MyLayout";

export default function Cosplay() {
    return <MyLayout>
        {process.browser ?
            <PicList getList={getCosplay} path="cosplay"/> : null}
    </MyLayout>
}