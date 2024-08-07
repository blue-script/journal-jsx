import SelectUser from '../SelectUser/SelectUser'
import Logo from '../Logo/Logo'

function Header() {
  return (
    <>
      <Logo image='/public/logo.svg' />
      <SelectUser />
    </>
  )
}

export default Header