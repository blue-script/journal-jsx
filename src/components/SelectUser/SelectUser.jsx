import s from './SelectUser.module.css'

import { useContext } from 'react'
import { UserContext } from '../../context/user.context'

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext)

  const changeUser = (e) => {
    setUserId(+e.target.value)
  }

  return (
    <select className={s['select']} name="user" id="user" value={userId} onChange={changeUser}>
      <option value="1">Антон</option>
      <option value="2">Вася</option>
    </select>
  )
}

export default SelectUser