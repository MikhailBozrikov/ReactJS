import './styles.css'
import { useContext } from 'react'
import { UserContext } from '../../../contexts/UserContext'

export const Header = () => {
  const user = useContext(UserContext)

  return (
    <header className="header">
      <div className="header-left">
        <img src="/stair.svg" alt="Stair icon" className="header-icon" />
        <h1 className="logo">Eats</h1>
      </div>
      <div className="header-right">
        <img src={user.avatar} alt="User avatar" className="avatar" />
      </div>
    </header>
  )
}