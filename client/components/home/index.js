import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Button from "../../components/ui/button"
import { v4 as uuidv4 } from "uuid"
import Router from "next/router"

function Home() {
    const socket = useSelector((state) => state.socketReducer.socket)

    useEffect(() => {
        if (socket) {
            socket.on("room-created", (roomId) => {
                console.log(roomId)
                const { pathname } = Router
                if (pathname == "/") {
                    console.log(pathname)
                    Router.push(`/rooms/${roomId}`)
                }
                // Router.push()
            })
        }
    }, [socket])

    const handleCreateRoomClick = () => {
        socket.emit("create-room")
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            {/* <div onClick={} className="text-3xl text-white rounded border p-2 hover:bg-gray-800 cursor-pointer">
                Create Room
            </div> */}
            <Button click={handleCreateRoomClick}>Create Room</Button>
        </div>
    )
}

export default Home
