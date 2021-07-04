import { useState, useEffect } from "react"
import Input from "../ui/input"

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
        if (currentMessage.trim()) {
            sendNewMessage(currentMessage)
            setCurrentMessage("")
        }
    }

    return (
        <div className="w-full h-full px-2 flex items-center gap-2">
            <Input
                value={currentMessage}
                placeholder="Send a message..."
                onChange={(e) => setCurrentMessage(e.target.value)}
                ringColor="focus:ring-gray-900"
            ></Input>
            <div
                onClick={handleSendClick}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex justify-center items-center text-white font-bold cursor-pointer"
            >
                {">"}
            </div>
        </div>
    )
}

export default ChatInput
