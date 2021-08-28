import React, { useEffect, useState } from 'react'
import {useRouter} from "next/router";


const Page404 = () => {
  //默认5秒后跳转
  const [remainTime, setRemainTime] = useState(5)
  const router =  useRouter()

  useEffect(() => {
    let timer = setInterval(() => {
      setRemainTime((time) => {
        if (time === 0) {
          router.replace('/').then(r => console.log(r))
        }
        return time - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="bg-white w-full h-96 flex flex-col justify-center items-center ">
      <div className="text-6xl mb-20">页面不存在</div>
      <div className="text-xl">将在{remainTime}秒钟后跳转...</div>
    </div>
  )
}

export default Page404
