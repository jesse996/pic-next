export interface PageResp<T> {
  currnet: number
  size: number
  total: number
  records: T[]
}

export interface PageReq {
  current: number
  size: number
}

export interface CommonResp{
  code:number,
  msg:string,
  data:any
}

export interface Pic {
  createTime: string
  description?: string
  id: number
  name?: string
  src?: string
  title: string
  type: number
  updateTime: string
  coverImg: string
  imgList: string[]
  loading?: boolean

  viewCount:number
}

export interface NewsResp {
  id: number
  coverImg: string
  title: string
  description: string
  content: string
  likeCount?: number
  viewCount?: number
  commentCount?: number
  loading?: boolean
}
