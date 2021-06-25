import { useState, useEffect, useRef } from "react"
import ChatMessage from "../chat-message"
import ChatInput from "../chat-input"

const messagesSample = [
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
]

function ChatMessages({ socket }) {
    const [messages, setMessages] = useState([])

    const messagesRef = useRef()

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (socket) {
            socket.on("messages", (serverMessages) => {
                console.log(serverMessages)
                if (serverMessages) {
                    setMessages(
                        serverMessages.map((message) => ({
                            isSelf: true,
                            username: null,
                            text: message
                        }))
                    )
                }
            })
        }
    }, [socket])

    const sendNewMessage = (text) => {
        // setMessages((prevValue) => [
        //     ...prevValue,
        //     {
        //         isSelf: true,
        //         username: null,
        //         text
        //     }
        // ])

        socket.emit("new-message", text)
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
