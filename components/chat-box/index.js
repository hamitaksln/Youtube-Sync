import ChatUsers from "../chat-users"
import ChatMessages from "../chat-messages"
function ChatBox({ userColor }) {
    return (
        <div
            className="w-full h-full bg-gray-600 rounded  sm:grid xl:grid-rows-[3fr,1fr] xl:grid-cols-[1fr] md:grid-cols-[3fr,1fr] md:grid-rows-[1fr] sm:grid-rows-[1fr] flex flex-col"
        >
            <div className="w-full rounded">
                <ChatMessages userColor={userColor}></ChatMessages>
            </div>
            <ChatUsers></ChatUsers>
        </div>
    )
}

export default ChatBox
