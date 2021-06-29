import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Input from "../ui/input"

function VideoIdInput() {
    const socket = useSelector((state) => state.socketReducer.socket)
    const [inputValue, setInputValue] = useState("")

    // useEffect(() => {
    //     if (socket) {
    //         socket.on("room-video-id", (videoId) => {
    //             console.log(videoId)
    //             if (videoId) {
    //                 dispatch(setVideoId(videoId))
    //             }
    //         })
    //     }
    // }, [socket])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleVideoIdChangeClick = () => {
        socket.emit("change-video-id", inputValue)
    }

    return (
        <div className="w-96 h-9 flex items-center gap-2">
            <Input
                value={inputValue}
                onChange={handleInputChange}
                ringColor="focus:ring-gray-400"
                placeholder="Enter video url or id"
            ></Input>
            <div onClick={handleVideoIdChangeClick} className="cursor-pointer">
                Change
            </div>
        </div>
    )
}

export default VideoIdInput
