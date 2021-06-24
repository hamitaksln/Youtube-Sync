import ChatUsers from "../chat-users"
import ChatMessages from "../chat-messages"
function ChatBox() {
    return (
        <div
            style={{ display: "grid", gridTemplateRows: "3fr 1fr" }}
            className="w-full h-full bg-gray-600 rounded overflow-hidden"
        >
            <div className="w-full">
                <ChatMessages></ChatMessages>
            </div>
            <ChatUsers></ChatUsers>
        </div>
    )
}

export default ChatBox
