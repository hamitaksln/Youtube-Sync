import VideoIdInput from "../video-id-input"
import YouSyncButton from "../you-sync-button"

function Header() {
    return (
        <div className="w-full h-full bg-gray-800 flex flex-col gap-2 sm:grid sm:grid-cols-[1fr,4fr,1fr] items-center text-white px-4">
            <div className="mt-2 md:mt-0">
                <YouSyncButton></YouSyncButton>
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <VideoIdInput></VideoIdInput>
            </div>
            <div className="w-full h-full flex items-center">
                {/* <div>Settings</div> */}
            </div>
        </div>
    )
}

export default Header
