function Button({ click, children }) {
    return (
        <div
            onClick={click}
            className="text-3xl text-white rounded border p-2 hover:bg-gray-800 cursor-pointer select-none"
        >
            {children}
        </div>
    )
}

export default Button
