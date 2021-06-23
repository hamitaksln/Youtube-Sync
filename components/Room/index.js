import YTPlayer from "../YTPlayer"
import ChatBox from "../ChatBox"

function Room() {
    return (
        <div
            style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
            className="w-full h-full bg-red-400 p-4 gap-4"
        >
            <YTPlayer></YTPlayer>
            <ChatBox></ChatBox>
        </div>
    )
}

export default Room
