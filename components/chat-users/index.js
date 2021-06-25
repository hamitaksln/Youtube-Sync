import { useState } from "react"
import cx from "classnames"

function ChatUsers({ users }) {
    const chatUsers = users.map((user, index) => ({
        id: index,
        username: user,
        permission: true
    }))
    // const [chatUsers, setUsers] = useState([
    //     { id: 1, username: "hamitaksln", permission: true },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false },
    //     { id: 2, username: "batigunemrah", permission: false }
    // ])

    return (
        <div className="w-full xl:h-[22.5vh] md:h-full h-[20vh] bg-gray-700 rounded-b flex flex-col items-center justify-center gap-2 p-2 py-2 text-white ">
            <div className="w-full flex justify-center">
                {chatUsers.length} Users
            </div>
            <div className="w-full h-full flex flex-col xl:flex-row xl:flex-wrap gap-2 overflow-y-auto overflow-x-hidden">
                {chatUsers.map((user, index) => (
                    <div
                        key={index}
                        className="w-[96%] xl:w-[45%] 2xl:w-[31%] h-12 flex gap-4 items-center p-2 px-2 border rounded cursor-pointer hover:bg-gray-600"
                    >
                        <div
                            className={cx("h-full w-1 bg-red-400 rounded", {
                                "bg-yellow-500": user.permission
                            })}
                        ></div>
                        <div className="flex flex-col truncate">
                            <span className="truncate">{user.username}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatUsers
