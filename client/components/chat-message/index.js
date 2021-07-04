import cx from "classnames"

function ChatMessage({ message }) {
    const { isSelf, username, text, color } = message

    return (
        <div
            className={cx("w-full flex ", {
                "justify-end": isSelf
            })}
        >
            <div
                className={cx(
                    "max-w-[16rem] h-full  border-gray-800 rounded-md border p-2 text-white",
                    { "bg-gray-500": isSelf, "bg-gray-700": !isSelf }
                )}
            >
                <div className="flex flex-col">
                    {!isSelf && (
                        <span style={{ color: color }}>{username}</span>
                    )}
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatMessage
