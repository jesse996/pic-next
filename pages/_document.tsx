import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.svg"/>
                    <script dangerouslySetInnerHTML={{
                        __html: ` var _hmt = _hmt || [];
                        (function() {
                        var hm = document.createElement("script");
                        hm.src = "https://hm.baidu.com/hm.js?2f2306fdd3f4cd29b18ab3d839ae3e0c";
                        var s = document.getElementsByTagName("script")[0];
                        s.parentNode.insertBefore(hm, s);
                    })();`
                    }}>
                    </script>
                    <script dangerouslySetInnerHTML={{
                        __html: `var _hmt = _hmt || [];
                        (function() {
                          var hm = document.createElement("script");
                          hm.src = "https://hm.baidu.com/hm.js?ba42bc5adec34305840039f52547a8dc";
                          var s = document.getElementsByTagName("script")[0]; 
                          s.parentNode.insertBefore(hm, s);
                        })();`
                    }}/>
                    <meta
                        name="keywords"
                        content="妹子图,美女图片专题,美女图片大全,绅士,绅士社,美女,性感,清纯美女,日本美女"
                    />
                    <meta
                        name="description"
                        content="绅士,绅士社,妹子图美女专题栏目，为您精心准备各种美女图片专题，包括名站美女写真，各类美女图片，美女大全等专题。"
                    />
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1377485396123371"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument