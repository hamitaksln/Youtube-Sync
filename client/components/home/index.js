import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Button from "../../components/ui/button"
import JoinRoom from "../../components/join-room"
import Router from "next/router"

function Home() {
    const socket = useSelector((state) => state.socketReducer.socket)

    useEffect(() => {
        if (socket) {
            socket.on("room-created", (roomId) => {
                const { pathname } = Router
                if (pathname == "/") {
                    Router.push(`/rooms/${roomId}`)
                }
            })
        }
    }, [socket])

    const handleCreateRoomClick = () => {
        socket.emit("create-room")
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <Button width="w-[12rem]" click={handleCreateRoomClick}>Create Room</Button>
            <JoinRoom></JoinRoom>
        </div>
    )
}

export default Home
