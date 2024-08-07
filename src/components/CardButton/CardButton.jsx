import './CardButton.css'

function CardButton({ children, className, ...rest}) {
  const cl = 'card-button' + (className ? ' ' + className : '')

  return (
    <button className={cl} {...rest}>
      {children}
    </button>
  )
}

export default CardButton