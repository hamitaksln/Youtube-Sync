import cx from "classnames"

function Button({ click, children,width }) {
    return (
        <div
            onClick={click}
            className={cx("flex justify-center text-3xl text-white rounded border p-2 hover:bg-gray-800 cursor-pointer select-none",width)}
        >
            {children}
        </div>
    )
}

export default Button
