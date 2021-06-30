import cx from "classnames"

function VideoSearchResults({ isLoading, videos }) {
    return (
        <div className={cx("w-full h-full bg-gray-700 rounded p-2 space-y-1")}>
            {videos.slice(0, 5).map((video) => (
                <div
                    className={cx(
                        "w-full h-24 flex items-center gap-2 bg-gray-600 p-2 rounded hover:bg-gray-500 cursor-pointer",
                        { blur: isLoading }
                    )}
                >
                    <div className="w-[35%]">
                        <div className="w-full h-[5rem] rounded overflow-hidden bg-black flex items-center">
                            <img src={video.thumbnail} alt="thumbnail" />
                        </div>
                    </div>

                    <div className="w-[65%]">
                        <span className="">{video.title}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default VideoSearchResults
