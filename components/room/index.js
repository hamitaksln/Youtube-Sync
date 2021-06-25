import { useState } from "react"
import YTPlayer from "../ytplayer"
import ChatBox from "../chat-box"
import cx from "classnames"

function Room() {
    const [users, setUsers] = useState([])

    return (
        <div
            // style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
            className="w-full h-full bg-gray-900 gap-4 p-4 grid xl:grid-cols-[3fr,1fr] xl:grid-rows-[1fr] grid-rows-[2fr,1fr]"
        >
            <YTPlayer setUsers={setUsers}></YTPlayer>
            <ChatBox users={users}></ChatBox>
        </div>
    )
}

export default Room
