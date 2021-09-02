/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }
const withAntdLess = require('next-plugin-antd-less');
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})

module.exports = withMDX({
        pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx'], generateEtags: false,
    ...withAntdLess({
// module.exports = withAntdLess({
        // optional
        modifyVars: {'@primary-color': '#04f'},
        // optional
        lessVarsFilePath: './src/styles/variables.less',
        // optional
        lessVarsFilePathAppendToEndOfContent: false,
        // optional https://github.com/webpack-contrib/css-loader#object
        cssLoaderOptions: {},

        // Other Config Here...

        webpack(config) {
            return config;
        },

        images: {
            domains: ['tva1.sinaimg.cn', 'tva4.sinaimg.cn', 'jdlingyu.com', 'www.jdlingyu.com'],
        },
    })
})
;
