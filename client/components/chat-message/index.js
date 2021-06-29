import cx from "classnames"

const colorList = [
    "#91ab01",
    "#db5ec2",
    "#8b7add",
    "#6bcbef",
    "#35cd96",
    "#dfb610",
    "#6eadf5",
    "#e67072",
    "#ba33dc",
    "#00b33e"
]

const getRandomColor = () => {
    const randomNumber = Math.floor(Math.random() * colorList.length)
    return colorList[randomNumber]
}

function ChatMessage({ message }) {
    const { isSelf, username, text, color } = message

    // getRandomColor()
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
