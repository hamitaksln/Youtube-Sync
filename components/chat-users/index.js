import { useState } from "react"
import cx from "classnames"

function ChatUsers() {
    const [users, setUsers] = useState([
        { id: 1, username: "hamitaksln", permission: true },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false },
        { id: 2, username: "batigunemrah", permission: false }
    ])

    return (
        <div className="w-full h-[22.5vh] bg-gray-700 flex flex-col items-center justify-center gap-2 p-2 py-2 text-white ">
            <div className="w-full flex justify-center">
                {users.length} Users
            </div>
            <div className="w-full h-full flex flex-wrap  gap-2 overflow-y-auto overflow-x-hidden">
                {users.map((user) => (
                    <div className="w-[31%] h-12 flex gap-4 items-center p-2 px-2 border rounded cursor-pointer hover:bg-gray-600">
                        <div
                            className={cx("h-full w-1 bg-red-400 rounded", {
                                "bg-yellow-500": user.permission
                            })}
                        ></div>
                        <div className="w-full">
                            {" "}
                            <span>{user.username}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatUsers
