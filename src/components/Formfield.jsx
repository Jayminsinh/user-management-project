import React from 'react'

function Formfield({
    label,
    name,
    type = "text",
    value,
    onChange,
    error,
    children,
    className,
    ...props
}) {

    return (
        <div className={`mb-3 ${className}`}>
            <label className='align-center text-md block font-medium '>{label}</label>
            {children || (
                <input
                    {...props}
                    className={`w-full rounded-md border px-3 py-2 text-sm
                     ${error ?
                            "border-red-400 focus:border-red-400"
                            : "border-gray-300 focus:border-gray-500"
                        }`}
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
            )
            }

            <p className='flex-wrap text-red-700 text-sm h-4 mt-1 font-sans px-1 py-0.5'>{error || ""}</p>

        </div>
    )
}

export default Formfield
