import YTPlayer from "../ytplayer"
import ChatBox from "../chat-box"

function Room() {
    return (
        <div
            style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
            className="w-full h-full bg-red-400 gap-4 p-4"
        >
            <YTPlayer></YTPlayer>
            <ChatBox></ChatBox>
        </div>
    )
}

export default Room
