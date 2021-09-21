import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
import cx from "classnames"
import { useState } from "react"
import Router from "next/router"

function JoinRoom() {
    const [currentRoomId, setCurrentRoomId] = useState("")
    const [isInputVisible, setIsInputVisible] = useState(false)
    const handleJoinRoomClick = () => {
        setIsInputVisible((prevValue) => !prevValue)
    }

    const handleGoToRoom = (e) => {
        const roomId = currentRoomId
        if (!roomId) return

        const { pathname } = Router
        if (pathname === "/") {
            Router.push(`/rooms/${roomId}`)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <Button width="w-[12rem]" click={handleJoinRoomClick}>
                Join Room
            </Button>

            <div
                className={cx("duration-100 w-[12rem]", {
                    "opacity-0": !isInputVisible,
                    "opacity-100": isInputVisible
                })}
            >
                <Input
                    value={currentRoomId}
                    onChange={(e) => setCurrentRoomId(e.target.value)}
                    ringColor="focus:ring-gray-500"
                    button
                    click={handleGoToRoom}
                ></Input>
            </div>
        </div>
    )
}

export default JoinRoom
