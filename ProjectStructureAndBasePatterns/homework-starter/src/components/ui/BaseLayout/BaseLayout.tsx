import './styles.css'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

type BaseLayoutProps = {
  children: React.ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="base-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}