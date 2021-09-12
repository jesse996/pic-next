import 'antd/dist/antd.css'
import "tailwindcss/tailwind.css";
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {store} from '../store'
import MyLayout from "../components/MyLayout";
import Head from "next/head";


function MyApp({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <Head>
            <title>妹子图 绅士社</title>
        </Head>
        <MyLayout>
            <Component {...pageProps} />
        </MyLayout>
    </Provider>
}

export default MyApp
