import React from 'react'

interface IButtonPrimaryProps {
    text?: string
    onClick?: () => void
}

const ButtonPrimary = ({ text, onClick }: IButtonPrimaryProps) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className="px-4 py-2 bg-white text-[#344054] rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
            {text}
        </button>
    )
}

export default ButtonPrimary
