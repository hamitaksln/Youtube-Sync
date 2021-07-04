import { useState, useEffect, useRef, useCallback } from "react"
import Youtube from "react-youtube"
import { useSelector, useDispatch } from "react-redux"
import { PLAYER_STATE } from "../../constants"
import { setVideoId } from "../../redux/actions/RoomActions"

function YTPlayer() {
    const socket = useSelector((state) => state.socketReducer.socket)
    const videoId = useSelector((state) => state.roomReducer.videoId)
    const dispatch = useDispatch()
    const [playerState, setPlayerState] = useState(null)
    const [ytPlayer, setYtPlayer] = useState()
    const [playerStartingTime, setPlayerStartingTime] = useState(0)

    const videoTimeStack = useRef([])

    useEffect(() => {
        if (socket) {
            socket.on("starting-time", (currentServerTime) => {
                setPlayerStartingTime(currentServerTime)
            })

            socket.on("room-video-id", (videoId) => {
                if (videoId) {
                    dispatch(setVideoId(videoId))
                }
            })
        }

        if (socket && ytPlayer) {
            socket.on("set-player-status", (playerState) => {
                setPlayerState(playerState)
            })
            socket.on("set-player-current-time", (playerCurrentTime) => {
                if (ytPlayer) {
                    ytPlayer.seekTo(playerCurrentTime, true)
                }
            })
        }
    }, [ytPlayer, socket])

    useEffect(() => {}, [])

    useEffect(() => {
        if (ytPlayer && socket) {
            if (playerState) {
                socket.emit("set-player-status", playerState)
            }
            if (playerState === "playing") {
                ytPlayer.playVideo()
            } else if (playerState === "paused") {
                ytPlayer.pauseVideo()
            }
        }
    }, [socket, ytPlayer, playerState])

    const handleTimeChanging = (player) => {
        function updateTime() {
            if (player && player.getCurrentTime) {
                if (socket) {
                    if (player.getPlayerState() === 1) {
                        socket.emit(
                            "update-server-time",
                            player.getCurrentTime()
                        )
                    }
                }
                videoTimeStack.current.push(player.getCurrentTime())

                if (videoTimeStack.current.length > 2) {
                    videoTimeStack.current.shift()
                }

                const diff =
                    videoTimeStack.current[1] - videoTimeStack.current[0]
                if (Math.abs(diff) > 1.1) {
                    socket.emit(
                        "set-player-current-time",
                        player.getCurrentTime()
                    )

                    if (PLAYER_STATE[player.getPlayerState()]) {
                        socket.emit(
                            "set-player-status",
                            PLAYER_STATE[player.getPlayerState()]
                        )
                    }
                }
            }
        }
        setInterval(updateTime, 1000)
    }

    const handlePlayerStartingTime = useCallback(
        (player) => {
            player.seekTo(playerStartingTime)
        },
        [playerStartingTime]
    )

    const handleStateChange = (event) => {
        const playerState = PLAYER_STATE[event.data]
        setPlayerState(playerState)
    }

    const handleOnReady = (event) => {
        const player = event.target
        setYtPlayer(player)
        handleTimeChanging(player)
        handlePlayerStartingTime(player)
    }

    return (
        <div className="w-full h-full bg-[#282828] rounded overflow-hidden">
            {videoId ? <Youtube
                videoId={videoId}
                containerClassName="h-full"
                opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                        origin: "https://you-sync.herokuapp.com/",
                        rel: 0,
                        showinfo: 0,
                        ecver: 2,
                        controls: 1,
                        disablekb: 1,
                        iv_load_policy: 3,
                        autoplay: 1,
                        start: 0
                    }
                }}
                onReady={handleOnReady}
                onStateChange={handleStateChange}

            />: <div className="w-full h-full flex justify-center items-center font-mono"><span className="text-white text-4xl">NO VIDEO</span></div>}
        </div>
    )
}

export default YTPlayer
