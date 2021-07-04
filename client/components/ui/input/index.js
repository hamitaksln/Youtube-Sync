import cx from "classnames"

function Input({ value, placeholder, onChange, ringColor, button, click }) {
    return (
        <div className="w-full h-full flex relative ">
            <input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={cx(
                    "w-full h-full rounded p-2 focus:outline-none focus:ring-2 focus:border-transparent text-black",
                    {
                        "focus:ring-gray-500": !ringColor,
                        "rounded-r-xs": button
                    },
                    ringColor
                )}
                type="text"
            ></input>
            {button && (
                <div
                    onClick={click}
                    className="absolute right-0 h-full w-8 flex justify-center items-center bg-red-900 hover:bg-red-800 text-white rounded-r font-bold select-none cursor-pointer"
                >
                    {">"}
                </div>
            )}
        </div>
    )
}

export default Input
