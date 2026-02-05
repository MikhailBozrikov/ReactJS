import { Flex } from "antd"

export const Cart = ({ count, textColor }: { count: number, textColor: string }) => {
  return (
    <Flex style={{ 
      color: textColor,
      fontSize: '16px',
      fontWeight: 'bold'
    }}>
      Число товаров: {count}
    </Flex>
  )
}