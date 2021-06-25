import ChatUsers from "../chat-users"
import ChatMessages from "../chat-messages"
function ChatBox({socket,users}) {
    return (
        <div
            // style={{ display: "grid", gridTemplateRows: "3fr 1fr" }}
            className="w-full h-full bg-gray-600 rounded  sm:grid xl:grid-rows-[3fr,1fr] xl:grid-cols-[1fr] md:grid-cols-[3fr,1fr] md:grid-rows-[1fr] sm:grid-rows-[1fr] flex flex-col"
        >
            <div className="w-full rounded">
                <ChatMessages socket={socket}></ChatMessages>
            </div>
            <ChatUsers users={users}></ChatUsers>
        </div>
    )
}

export default ChatBox
