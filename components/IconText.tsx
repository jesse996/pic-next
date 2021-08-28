import { Space } from 'antd'
import React from 'react'

// eslint-disable-next-line react/display-name
export default ({ icon, text }: { icon: any; text: string | number }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)
