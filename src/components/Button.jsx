import React from 'react'

function Button({
    children, 
    type = 'button',
    bgColor = 'red',
    textColor = 'white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2  my-2 ${className} 
    ${textColor} ${bgColor}`} {...props}>
        {children}
    </button>
  )
}

export default Button
