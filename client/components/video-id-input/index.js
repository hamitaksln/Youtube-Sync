import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import getYouTubeID from "get-youtube-id"
import Input from "../ui/input"
import ClipLoader from "../ui/clip-loader"
import VideoSearchResults from "../video-search-results"
import { DebounceInput } from "react-debounce-input"
import cx from "classnames"
import useComponentVisible from "../../hooks/useComponentVisible"
import { SERVER_URL } from "../../constants"

function VideoIdInput() {
    const socket = useSelector((state) => state.socketReducer.socket)
    const [searchVideos, setSearchVideos] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false)

    useEffect(() => {
        const query = inputValue
        handleSearchVideo(query)
    }, [inputValue])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSearchVideo = async (query) => {
        if (query.trim() === "" || query.slice(-1) === " ") return
        setIsComponentVisible(true)
        setIsLoading(true)

        let requestUrl = ""

        if (query.includes("http") || query.includes("https")) {
            const videoId = getYouTubeID(query)
            requestUrl = `${SERVER_URL}/api/youtube/${videoId}`
        } else {
            requestUrl = `${SERVER_URL}/api/youtube/search/${inputValue}`
        }

        axios
            .get(requestUrl)
            .then((res) => {
                const searchResults = res.data.data
                setSearchVideos(searchResults)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleVideoClick = (videoId) => {
        if (videoId) {
            socket.emit("change-video-id", videoId)
            setIsComponentVisible(false)
        }
    }

    return (
        <div
            ref={ref}
            className="w-[30rem] h-9 flex items-center gap-2 relative"
        >
            <DebounceInput
                element={Input}
                value={inputValue}
                onChange={handleInputChange}
                minLength={2}
                debounceTimeout={300}
                placeholder="Search video or paste url."
            />
            <div
                className={cx("w-full absolute top-[2.25rem] mt-1", {
                    "h-24": searchVideos.length === 0
                })}
            >
                {isLoading && (
                    <div className="w-full h-full absolute flex justify-center items-center z-10">
                        <ClipLoader></ClipLoader>
                    </div>
                )}
                <div
                    className={cx("w-full h-full", {
                        hidden: !isComponentVisible
                    })}
                >
                    <VideoSearchResults
                        isLoading={isLoading}
                        videos={searchVideos}
                        handleVideoClick={handleVideoClick}
                    ></VideoSearchResults>
                </div>
            </div>
        </div>
    )
}

export default VideoIdInput
