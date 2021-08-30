import { Space } from 'antd'
import React from 'react'

const IconText = ({ icon, text }: { icon: any; text: string | number }) => <Space>
  {React.createElement(icon)}
  {text}
</Space>;

// eslint-disable-next-line react/display-name
export default IconText;
