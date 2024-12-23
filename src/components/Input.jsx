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
        <div className={'m-4'}>
            {label && <label 
            htmlFor={id}>
                {label}
            </label>}
            <input 
            className={`${className}`}
            type={type} 
            placeholder={type !== "file" ? placeholder : ""}
            id={id} 
            ref={ref}
            {...props}
            />
        </div>
    )
})

export default Input
