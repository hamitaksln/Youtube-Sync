import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import Room from "../../components/room"
import Header from "../../components/header"
import { initSocket } from "../../redux/actions/SocketActions"
import { setVideoId } from "../../redux/actions/RoomActions"
import Head from "next/head"
import YouSyncButton from "../../components/you-sync-button"

const Rooms = () => {
    const socket = useSelector((state) => state.socketReducer.socket)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isRoomFound, setIsRoomFound] = useState(false)
    const { pid } = router.query

    useEffect(() => {
        if (socket === null) {
            dispatch(initSocket())
        }

        return () => {
            if (socket) {
                socket.emit("user-leave")
            }
            dispatch(setVideoId(""))
        }
    }, [])

    useEffect(() => {
        if (isRoomFound) {
        }
    }, [isRoomFound])

    useEffect(() => {
        if (socket && pid) {
            socket.on("check-if-room-exists", ({ isRoomFound, roomId }) => {
                if (isRoomFound) {
                    socket.emit("join-room", roomId)
                }
                setIsRoomFound(isRoomFound)
            })

            if (!isRoomFound) {
                socket.emit("check-if-room-exists", pid)
            }
        }
    }, [socket, pid, isRoomFound])

    return (
        <div className="site-container">
            <Head>
                <title>Youtube SYNC</title>
                <meta
                    name="viewport"
                    content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <main className="w-full h-full">
                {isRoomFound ? (
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full sm:h-16">
                            <Header></Header>
                        </div>
                        <div className="w-full h-full bg-gray-500">
                            <Room pid={pid}></Room>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center font-mono gap-4">
                        <span className="text-white text-4xl">
                            Room not found.
                        </span>
                        <YouSyncButton></YouSyncButton>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Rooms
