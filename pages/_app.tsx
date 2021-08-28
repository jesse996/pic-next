// import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {AliveScope} from 'react-activation'
import {store} from '../store'


function MyApp({Component, pageProps}: AppProps) {
    // return <Component {...pageProps} />
    return <Provider store={store}>
        <AliveScope>
            <Component {...pageProps} />
        </AliveScope>
    </Provider>
}

export default MyApp
