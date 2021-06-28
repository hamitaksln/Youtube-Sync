import { useState, useEffect } from "react"
import YTPlayer from "../ytplayer"
import ChatBox from "../chat-box"
import cx from "classnames"
import { COLOR_LIST } from "../../constants"

const getRandomColor = (colorList) => {
    const randomNumber = Math.floor(Math.random() * colorList.length)
    return colorList[randomNumber]
}

function Room({ pid }) {
    const [users, setUsers] = useState([])
    const [socket, setSocket] = useState()
    const [userColor, setUserColor] = useState("#FFFFFF")

    useEffect(() => {
        setUserColor(getRandomColor(COLOR_LIST))
    }, [])

    return (
        <div
            // style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}
            className="w-full h-full bg-gray-900 gap-4 p-4 grid xl:grid-cols-[3fr,1fr] xl:grid-rows-[1fr] grid-rows-[2fr,1fr]"
        >
            <div className="absolute bottom-0">{pid}</div>
            <YTPlayer></YTPlayer>
            <ChatBox userColor={userColor}></ChatBox>
        </div>
    )
}

export default Room
