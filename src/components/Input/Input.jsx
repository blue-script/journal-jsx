import { forwardRef } from 'react'
import s from './Input.module.css'
import cn from 'classnames'

const Input = forwardRef(function Input({ className, isValid = true, appearance, ...rest }, ref) {

  return (
    <input
      {...rest}
      ref={ref}
      className={
        cn(className, s['input'], {
          [s['invalid']]: !isValid,
          [s['input-title']]: appearance === 'title'
        })
      }
    />
  )
})

export default Input