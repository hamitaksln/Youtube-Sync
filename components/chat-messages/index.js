import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import ChatMessage from "../chat-message"
import ChatInput from "../chat-input"

function ChatMessages({ userColor }) {
    const socket = useSelector((state) => state.socketReducer.socket)
    const [messages, setMessages] = useState([])

    const messagesRef = useRef()

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (socket) {
            socket.on("new-message", (newMessage) => {
                console.log(newMessage, socket.id)
                const isSelf = newMessage.username === socket.id
                if (newMessage) {
                    setMessages((prevValue) => [
                        ...prevValue,
                        {
                            isSelf,
                            username: newMessage.username,
                            text: newMessage.text,
                            color: newMessage.color
                        }
                    ])
                }
            })
        }
    }, [socket])

    const sendNewMessage = (text) => {
        socket.emit("new-message", { text, color: userColor })
    }

    return (
        <div className="w-full h-full flex flex-col justify-between rounded-t bg-gray-600 gap-2 py-2">
            <div
                ref={messagesRef}
                className="w-full xl:h-[60vh] h-[40vh] flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2"
            >
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message}></ChatMessage>
                ))}
            </div>
            <div className="w-full">
                <ChatInput sendNewMessage={sendNewMessage}></ChatInput>
            </div>
        </div>
    )
}

export default ChatMessages
