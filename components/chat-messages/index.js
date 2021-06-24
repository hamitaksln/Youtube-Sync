import { useState, useEffect, useRef } from "react"
import ChatMessage from "../chat-message"
import ChatInput from "../chat-input"

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
        }
        ,
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        }
        ,
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        }
        ,
        {
            isSelf: false,
            username: "batigunemrah",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
        }
        ,
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

    const messagesRef = useRef()

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages])

    const sendNewMessage = (text) => {
        setMessages((prevValue) => [
            ...prevValue,
            {
                isSelf: true,
                username: null,
                text
            }
        ])
    }

    return (
        <div className="w-full h-full flex flex-col justify-between bg-gray-600 gap-2 py-2">
            <div
                ref={messagesRef}
                className="w-full h-[60vh] flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2"
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
