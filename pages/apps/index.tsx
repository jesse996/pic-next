const AppItem = ({img,name,href}:{img:string,name:string,href:string}) => {
    return <div className={'flex justify-center items-center flex-col'}>
        <div>
            <img src={img} alt={name} width={50} height={50}/>
            <div>{name}</div>
        </div>
        <div className={'mt-3 border-2 '}>
            <a href={href} className={'px-4 py-2 mt-2 text-red-600'}>下载</a>
        </div>
    </div>
}

const Apps = () => {
    const list = [{img: 'https://www.hczzw.com//a/2021-07-05/16254534321835.jpg', name: '甜她直播',href:'http://cdn.d.chexu.net/android/mp/channel/tt34/7661/ctt34.apk'}]
    return <div className={'flex justify-around items-center flex-wrap bg-white py-10'}>
        {list.map(i => (<AppItem key={i.name} img={i.img} name={i.name} href={i.href}/>))}
    </div>
}

export default Apps