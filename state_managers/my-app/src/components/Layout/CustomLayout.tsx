import { Layout, Switch, Flex } from "antd"
import { contentStyle, footerStyle, headerStyle, layoutStyle } from "./styles"
import { Cart } from "../../features/counter/Cart"
import { Items } from "../../features/counter/Items"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectThemeColors, selectCurrentTheme, toggleTheme } from "../../features/counter/themeSlice"
import { selectCount } from "../../features/counter/counterSlice"

const { Header, Footer, Content } = Layout

export const CustomLayout = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const themeColors = useAppSelector(selectThemeColors)
  const currentTheme = useAppSelector(selectCurrentTheme)

  const handleSwitch = (_checked: boolean) => {
    dispatch(toggleTheme())
  }

  return (
    <Layout style={{ 
      ...layoutStyle, 
      backgroundColor: themeColors.backgroundColor,
      color: themeColors.textColor 
    }}>
      <Header style={{ 
        ...headerStyle, 
        backgroundColor: themeColors.headerBg,
        color: themeColors.textColor 
      }}>
        <Cart count={count} textColor={themeColors.textColor} />
        <Flex align="center" gap={8}>
          <span style={{ color: themeColors.textColor }}>
            {currentTheme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
          </span>
          <Switch 
            onChange={handleSwitch} 
            checked={currentTheme === 'dark'}
          />
        </Flex>
      </Header>
      <Content style={{ 
        ...contentStyle, 
        backgroundColor: themeColors.contentBg,
        color: themeColors.textColor 
      }}>
        <Items />
      </Content>
      <Footer style={{ 
        ...footerStyle, 
        backgroundColor: themeColors.footerBg,
        color: themeColors.textColor 
      }}>
        Footer © {new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}