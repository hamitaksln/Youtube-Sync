import { useState, useEffect } from "react"
import axios from "axios"
import getYouTubeID from "get-youtube-id"
import Input from "../ui/input"
import ClipLoader from "../ui/clip-loader"
import VideoSearchResults from "../video-search-results"
import { DebounceInput } from "react-debounce-input"
import cx from "classnames"
import useComponentVisible from "../../hooks/useComponentVisible"

function VideoIdInput() {
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

    const handleVideoIdChangeClick = () => {
        // socket.emit("change-video-id", inputValue)
        const query = inputValue
        handleSearchVideo(query)
    }

    const handleSearchVideo = (query) => {
        if (query.trim() === "" || query.slice(-1) === " ") return
        setIsComponentVisible(true)
        setIsLoading(true)

        if (query.includes("http") || query.includes("https")) {
            const videoId = getYouTubeID(query)
            axios
                .get(`http://localhost:5000/api/youtube/${videoId}`)
                .then((res) => {
                    const searchResults = res.data.data
                    setSearchVideos(searchResults)
                    setIsLoading(false)

                    console.log(searchResults)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            axios
                .get(`http://localhost:5000/api/youtube/search/${inputValue}`)
                .then((res) => {
                    const searchResults = res.data.data
                    setSearchVideos(searchResults)
                    setIsLoading(false)
                    // setIsComponentVisible(true)
                    console.log(searchResults)
                })
                .catch((err) => {
                    console.log(err)
                })
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
            {/* <div onClick={handleVideoIdChangeClick} className="cursor-pointer">
                Change
            </div> */}
            <div
                className={cx("w-full absolute top-[2.25rem] mt-1", {
                    "h-24": searchVideos.length === 0
                    // "invisible": !isLoading
                })}
            >
                {isLoading && (
                    <div className="w-full h-full absolute flex justify-center items-center z-10">
                        <ClipLoader></ClipLoader>
                    </div>
                )}
                <div
                    className={cx("w-full h-full", {
                        "opacity-0": !isComponentVisible,
                        "opacity-100": isComponentVisible
                    })}
                >
                    <VideoSearchResults
                        isLoading={isLoading}
                        videos={searchVideos}
                    ></VideoSearchResults>
                </div>
            </div>
        </div>
    )
}

export default VideoIdInput
