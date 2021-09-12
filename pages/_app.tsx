// import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
// import {AliveScope} from 'react-activation'
import {store} from '../store'
import {memo, useEffect, useRef} from "react";
import {useRouter} from "next/router";
import MyLayout from "../components/MyLayout";
import Head from "next/head";

// const ROUTES_TO_RETAIN = ['/', '/girl', '/pure-girl', '/news', '/cosplay']

function MyApp({Component, pageProps}: AppProps) {
    // const router = useRouter()
    // const retainedComponents = useRef({})
    //
    // const isRetainableRoute = ROUTES_TO_RETAIN.includes(router.asPath)
    //
    // // Add Component to retainedComponents if we haven't got it already
    // // @ts-ignore
    // if (isRetainableRoute && !retainedComponents.current[router.asPath]) {
    //     const MemoComponent = memo(Component)
    //     // @ts-ignore
    //     retainedComponents.current[router.asPath] = {
    //         component: <MemoComponent {...pageProps} />,
    //         scrollPos: 0
    //     }
    // }
    //
    // // Save the scroll position of current page before leaving
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // const handleRouteChangeStart = (url: string) => {
    //     if (isRetainableRoute) {
    //         // @ts-ignore
    //         retainedComponents.current[router.asPath].scrollPos = window.scrollY
    //     }
    // }
    //
    // // Save scroll position - requires an up-to-date router.asPath
    // useEffect(() => {
    //     router.events.on('routeChangeStart', handleRouteChangeStart)
    //     return () => {
    //         router.events.off('routeChangeStart', handleRouteChangeStart)
    //     }
    // }, [handleRouteChangeStart, router.asPath, router.events])
    //
    // // Scroll to the saved position when we load a retained component
    // useEffect(() => {
    //     if (isRetainableRoute) {
    //         // @ts-ignore
    //         window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos)
    //     }
    // }, [Component, isRetainableRoute, pageProps, router.asPath])

    // return <Component {...pageProps} />
    return <Provider store={store}>
        <Head>
            <title>妹子图 绅士社</title>
        </Head>
        <MyLayout>
            {/*<div style={{display: isRetainableRoute ? 'block' : 'none'}}>*/}
            {/*    {Object.entries(retainedComponents.current).map(([path, c]) => (*/}
            {/*        <div*/}
            {/*            key={path}*/}
            {/*            style={{display: router.asPath === path ? 'block' : 'none'}}*/}
            {/*        >*/}
            {/*            {// @ts-ignore*/}
            {/*                c.component}*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*{!isRetainableRoute && <Component {...pageProps} />}*/}
            <Component {...pageProps} />
        </MyLayout>
    </Provider>
}

export default MyApp
