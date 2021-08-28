import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserInfo {
  username: string
  nickname: string
}

export interface CommonStatus {
  showLoginModel: boolean
  showSignUpModel: boolean
  userInfo?: UserInfo
}

const initialState: CommonStatus = {
  showLoginModel: false,
  showSignUpModel: false,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setShowLoginModel: (state, action: PayloadAction<boolean>) => {
      state.showLoginModel = action.payload
    },
    setShowSignUpModel: (state, action: PayloadAction<boolean>) => {
      state.showSignUpModel = action.payload
    },
    setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => {
      state.userInfo = action.payload
    },
  },
})

export const { setShowLoginModel, setShowSignUpModel, setUserInfo } =
  commonSlice.actions

export default commonSlice.reducer
