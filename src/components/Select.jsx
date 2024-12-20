import React, { useId } from 'react'

function Select({
    opations = [],
    label,
    className = "",
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id}>
                {label}
            </label>
            }
            <select
                className={`${className}`}
                ref={ref}
                id={id}
                {...props}
            >
                {opations?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))

                }
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
