import s from './Logo.module.css'
import { memo } from 'react'

function Logo({ image }) {
  return <img className={s['logo']} src={image} alt="logo journal" />
}

export default memo(Logo)