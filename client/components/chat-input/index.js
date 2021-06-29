import { useState, useEffect } from "react"

function ChatInput({ sendNewMessage }) {
    const [currentMessage, setCurrentMessage] = useState("")

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPressed, true)
        return () => {
            document.removeEventListener("keydown", handleKeyPressed, true)
        }
    })

    const handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            handleSendClick()
        }
    }

    const handleSendClick = () => {
        console.log(currentMessage)
        if (currentMessage.trim()) {
            sendNewMessage(currentMessage)
            setCurrentMessage("")
        }
    }

    return (
        <div className="w-full h-full px-2 flex items-center gap-2">
            <input
                value={currentMessage}
                placeholder="Send a message..."
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="w-full h-full rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                type="text"
            ></input>
            <div
                onClick={handleSendClick}
                className="w-10 h-10 rounded-full bg-gray-800 flex justify-center items-center text-white font-bold cursor-pointer"
            >
                {">"}
            </div>
        </div>
    )
}

export default ChatInput
