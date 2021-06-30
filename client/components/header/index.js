import Router from "next/router"
import VideoIdInput from "../video-id-input"
import YouSyncButton from "../you-sync-button"

function Header() {
    return (
        <div className="w-full h-full bg-gray-800 grid grid-cols-[1fr,4fr,1fr] items-center text-white px-4">
            {/* <div onClick={() => Router.push("/")}>YOU SYNC</div> */}
            <div>
                <YouSyncButton></YouSyncButton>
                {/* <div
                    onClick={() => Router.push("/")}
                    className="w-36 flex justify-center rounded border px-2 text-2xl font-mono hover:bg-red-900 cursor-pointer select-none"
                >
                    <span>YOU SYNC</span>
                </div> */}
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <VideoIdInput></VideoIdInput>
                {/* <input type="text" /> */}
            </div>
            <div className="w-full h-full flex items-center">
                <div>Settings</div>
            </div>
        </div>
    )
}

export default Header
