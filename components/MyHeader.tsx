import React, {ReactNode, useEffect, useRef, useState} from 'react'
import {Button, Dropdown, Input, Menu, message} from 'antd'
import Login from './Login'
import {useAppDispatch, useAppSelector} from '../hook'
import {
    setShowLoginModel,
    setShowSignUpModel,
    setUserInfo,
} from '../store/slice/commonSlice'
import SignUp from './SignUp'
import {DownOutlined, MenuOutlined, UserOutlined} from '@ant-design/icons'
import {getCurrentUser, logout, search, sendActivateEmail} from '../api'
import {useRouter} from "next/router";
import Link from 'next/link'
import PayVip from "./PayVip";
import {use} from "ast-types";
import dayjs from "dayjs";

interface ITab {
    name: string
    path: string
}

const {Search} = Input
const tabs: ITab[] = [
    {
        name: '首页',
        path: '/',
    },
    {
        name: 'COSPLAY',
        path: '/cosplay',
    },
    {
        name: '妹子图',
        path: '/pure-girl',
    },
    {
        name: '性感妹子',
        path: '/girl',
    },
    {
        name: '资讯',
        path: '/news',
    },
    {
        name:'下app赚钱',
        path:'/apps'
    }
]

function MyHeader() {
    const [currentTab, setCurrentTab] = useState('')
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showVip, setShowVip] = useState(false)
    const dispatch = useAppDispatch()
    const router = useRouter()

    let userInfo = useAppSelector((state) => state.common.userInfo)
    useEffect(() => {
        ;(async () => {
            try {
                let userInfo = await getCurrentUser()
                dispatch(setUserInfo(userInfo))
            } catch (e) {
            }
        })()
    }, [dispatch])

    //地址变化设置tab
    useEffect(() => {
        let path = router.pathname
        let match = tabs.slice(1).find((i) => path.startsWith(i.path))?.path || '/'
        setCurrentTab(match)
    }, [router.pathname])

    //pc点击导航
    const handleChangeHeaderTab = async (path: string) => {
        // setCurrentPath(path)
        await router.push(path)
    }

    const mask = useRef<HTMLDivElement>(null)
    //禁止蒙层滑动
    useEffect(() => {
        mask.current?.addEventListener(
            'touchmove',
            (e) => {
                e.preventDefault()
            },
            false
        )
    }, [])

    const handleChangeShowMobileMenu = () => {
        setShowMobileMenu((i) => !i)
    }

    //搜索
    const handleSearch = async (value: string) => {
        if (!value) return
        setShowMobileMenu(false)
        await router.push(`/search?keyword=${value}`)
    }

    //推出
    const handleLogout = async () => {
        await logout()
        localStorage.removeItem('jwt_token')
        dispatch(setUserInfo(undefined))
        message.success('退出成功！')
    }

    const handleActivate = async () => {
        let ok = await sendActivateEmail()
        if (ok) {
            message.success('发送成功，请注意查收邮箱')
        } else {
            message.error('发送失败，请重试')
        }
    }

    //充值会员
    const handlePayVip = async () => {
        // console.log('pay vip')
        setShowVip(true)
    }

    const DropDownMenu = () => (
        <Menu>
            <Menu.Item key={0}>
                <div onClick={handleLogout}>退出</div>
                {/*<div onClick={handleActivate}>激活账号</div>*/}
                {userInfo?.isVip ? <div>到期时间: <span className={'font-bold'}>{dayjs(userInfo.vipExpireTime).format('YYYY-MM-DD')}</span>
                    </div> :
                    <div onClick={handlePayVip}>充值会员</div>}
            </Menu.Item>
        </Menu>
    )

    const UserInfo = (props: any) => {
        return userInfo ? (
            <Dropdown
                {...props}
                overlay={DropDownMenu}
                placement="bottomCenter"
                arrow
                className="flex justify-center items-center"
            >
                <div className="w-full pl-4 cursor-pointer">
                    <UserOutlined className="mr-1"/>
                    {userInfo.nickname}<span
                    className={'ml-2 text-red-600 font-medium'}>{userInfo.isVip ? 'Vip' : null}</span>
                    <DownOutlined className=" ring-blue-300"/>
                </div>
            </Dropdown>
        ) : (
            <>
                {/* <Button onClick={() => setLoginVisible(true)}>登录</Button> */}
                <Button onClick={() => dispatch(setShowLoginModel(true))}>
                    登录
                </Button>
                <Button
                    type={'primary'}
                    onClick={() => {
                        dispatch(setShowSignUpModel(true))
                    }}
                >
                    注册
                </Button>
            </>
        )
    }
    return (
        <div className="max-w-full">
            {/* 手机版菜单 ,高度16，px-4*/}
            <div className={'fixed inset-x-0 h-16 z-20 bg-white md:hidden'}>
                <div className={'h-full w-full px-4 flex justify-between items-center'}>
                    <div className={'text-xl '}>
                        <Link href="/" passHref={true}>
                            <div>绅士社</div>
                        </Link>
                    </div>
                    <div
                        onClick={handleChangeShowMobileMenu}
                        className={
                            'flex  justify-center items-center  w-10 h-8  bg-gray-100'
                        }
                    >
                        <MenuOutlined/>
                    </div>
                </div>
            </div>
            {/* 展开菜单栏 */}
            <div
                ref={mask}
                onClick={handleChangeShowMobileMenu}
                className={`fixed w-full max-w-screen ${
                    showMobileMenu ? 'visible opacity-90' : 'invisible opacity-0'
                }   inset-x-0  top-16 bottom-0 bg-gray-50 bg-opacity-60 pb-10 transition duration-200 z-20`}
            >
                <div
                    className={'max-w-full px-4 pb-6 text-base space-y-3 bg-white'}
                    onClick={(e) => {
                        e.preventDefault()
                    }}
                >
                    {tabs.map((tab) => (
                        <div key={tab.path}>
                            <Link href={tab.path} passHref={true}>
                                <div>{tab.name}</div>
                            </Link>
                        </div>
                    ))}
                    <UserInfo onClick={(e: any) => e.stopPropagation()}/>
                    <Search
                        allowClear={true}
                        className={'flex justify-center items-center'}
                        onSearch={handleSearch}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </div>

            {/* pc版菜单 */}
            <div
                className={
                    'fixed hidden md:block w-full max-w-full h-16 z-10 md:z-30 bg-white'
                }
            >
                <div
                    className={'md:w-3/5 h-full m-auto flex justify-between items-center'}
                >
                    <div className="w-full">
                        <Menu
                            selectedKeys={[currentTab]}
                            mode="horizontal"
                        >
                            {tabs.map((tab) => (
                                <Menu.Item
                                    key={tab.path}
                                    title={tab.name}
                                    onClick={() => handleChangeHeaderTab(tab.path)}
                                >
                                    <div>{tab.name}</div>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </div>
                    <div className={'flex justify-between items-center'}>
                        <Search allowClear={true} onSearch={handleSearch}/>
                        <UserInfo/>
                    </div>
                </div>
            </div>
            <Login/>
            <SignUp/>
            <PayVip showPay={showVip} setShowPay={setShowVip}/>
        </div>
    )
}

export default MyHeader
