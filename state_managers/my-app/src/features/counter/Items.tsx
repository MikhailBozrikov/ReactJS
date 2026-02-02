/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Button, Card, Flex } from "antd"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { decrement, increment, selectCount } from "./counterSlice"
import { selectThemeColors } from "./themeSlice"

export const Items = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const themeColors = useAppSelector(selectThemeColors)

  return (
    <Flex vertical gap={40} style={{ height: "100%" }}>
      <Flex gap={20} justify="center">
        <Button 
          onClick={() => dispatch(increment())}
          style={{
            backgroundColor: themeColors.buttonBg,
            color: themeColors.buttonText,
            borderColor: themeColors.borderColor
          }}
        >
          Добавить
        </Button>
        <Button 
          onClick={() => dispatch(decrement())}
          style={{
            backgroundColor: themeColors.buttonBg,
            color: themeColors.buttonText,
            borderColor: themeColors.borderColor
          }}
        >
          Удалить
        </Button>
      </Flex>
      <Flex gap={20} wrap>
        {[...Array(count)]?.map((_, index) => {
          return (
            <Card 
              key={index}
              style={{
                backgroundColor: themeColors.cardBg,
                color: themeColors.cardText,
                borderColor: themeColors.borderColor,
                width: '200px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              Товар {index + 1}
            </Card>
          )
        })}
      </Flex>
    </Flex>
  )
}