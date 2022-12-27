import React from 'react'

const CheckBoxC = ({ book, inputChange }) => {
    const { id, Name } = book;
    return (
        <>
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <input
                        type="checkbox"
                        name="languages"
                        value={Name}
                        id={id}
                        onChange={inputChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="comments" className="font-medium text-gray-700">
                        {Name}
                    </label>
                </div>
            </div>
        </>
    )
}

export default CheckBoxC