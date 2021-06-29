import cx from "classnames"

function Input({ value, placeholder, onChange, ringColor }) {
    return (
        <input
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={cx(
                "w-full h-full rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-black",
                ringColor
            )}
            type="text"
        ></input>
    )
}

export default Input
