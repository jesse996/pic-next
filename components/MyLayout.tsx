import React from 'react'
import {BackTop, Layout} from 'antd'
import MyHeader from './MyHeader'
import {useRouter} from "next/router";
const {Footer, Content} = Layout

const MyLayout: React.FC = ({children}) => {
    const router = useRouter()
    console.log('router.pathname:',router)
    return (
            <Layout>
                <MyHeader/>
                <Content
                    className={'px-2 w-full mt-20 md:w-2/3 lg:w-1/2 m-auto max-w-full'}
                >
                    {children}
                </Content>

                <Footer className="flex flex-col justify-center items-center text-center">
                    <div>
                        <div className="md:inline">Copyright © 2021 绅士社</div>
                        <div className="md:inline md:ml-2">
                            广告投放:
                            <span className="font-bold"> 951576941@qq.com</span>
                        </div>
                    </div>
                    <div className="pt-1">
                        本站纯属免费美女图片欣赏网站，所有图片均收集于互联网，如有侵犯权益请来信告知，我们将立即更正。
                    </div>
                </Footer>
                <BackTop/>
            </Layout>
    )
}

export default MyLayout
