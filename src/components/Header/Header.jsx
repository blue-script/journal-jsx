import SelectUser from '../SelectUser/SelectUser'
import s from './Header.module.css'

function Header() {

  return (
    <>
      <img className={s['logo']} src="/public/logo.svg" alt="logo journal" />
      <SelectUser />
    </>
  )
}

export default Header