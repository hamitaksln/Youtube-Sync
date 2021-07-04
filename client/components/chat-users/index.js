import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setUsers } from "../../redux/actions/RoomActions"
import cx from "classnames"

function ChatUsers() {
    const users = useSelector((state) => state.roomReducer.users)
    const socket = useSelector((state) => state.socketReducer.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        if (socket) {
            socket.on("users", (users) => {
                dispatch(setUsers(users.map((user) => user.id)))
            })
        }
    }, [socket])

    return (
        <div className="w-full xl:h-[22.5vh] md:h-full h-[20vh] bg-gray-700 rounded-b flex flex-col items-center justify-center gap-2 p-2 py-2 text-white ">
            <div className="w-full flex justify-center">
                {users.length} Users
            </div>
            <div className="w-full h-full flex flex-col xl:flex-row xl:flex-wrap gap-2 overflow-y-auto overflow-x-hidden">
                {users.map((user, index) => (
                    <div
                        key={index}
                        className="w-[96%] xl:w-[45%] 2xl:w-[31%] h-12 flex gap-4 items-center p-2 px-2 border rounded cursor-pointer hover:bg-gray-600"
                    >
                        <div
                            className={cx("h-full w-1 bg-red-400 rounded", {
                                "bg-yellow-500": true
                            })}
                        ></div>
                        <div className="flex flex-col truncate">
                            <span className="truncate">{user}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatUsers
