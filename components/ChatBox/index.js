import ChatUsers from "../CharUsers"
import ChatMessages from "../ChatMessages"
function ChatBox() {
    return (
        <div
            style={{ display: "grid", gridTemplateRows: "3fr 1fr" }}
            className="w-full h-full bg-gray-600"
        >
            <ChatUsers></ChatUsers>
            <ChatMessages></ChatMessages>
        </div>
    )
}

export default ChatBox
