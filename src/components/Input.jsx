import React,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    placeholder,
    ...props
}, ref) {
    
    const id = useId()
    return (
        <div className={'w-full'}>
            {label && <label 
            htmlFor={id}>
                {label}
            </label>}
            <input 
            className={`${className}`}
            type={type} 
            placeholder={placeholder}
            id={id} 
            ref={ref}
            {...props}
            />
        </div>
    )
})

export default Input
