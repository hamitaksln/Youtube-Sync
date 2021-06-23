import { useState } from "react"
import ChatMessage from "../chat-message"

function ChatMessages() {
    const [messages, setMessages] = useState([
        {
            isSelf: true,
            username: null,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        },
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        }
    ])

    return (
        <div className="w-full h-[66vh] flex flex-col bg-gray-600">
            <div
                // style={{ height: "calc(100% - 30px)" }}
                className="w-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2"
            >
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message}></ChatMessage>
                ))}
            </div>
        </div>
    )
}

export default ChatMessages
