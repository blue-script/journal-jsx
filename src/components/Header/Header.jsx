import s from './Header.module.css'

function Header() {

  return (
    <img className={s['logo']} src="/public/logo.svg" alt="logo journal" />
  )
}

export default Header