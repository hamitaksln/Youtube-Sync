import { useState, useEffect, useRef, useCallback } from "react"
import Youtube from "react-youtube"
import openSocket from "socket.io-client"
import { PLAYER_STATE } from "../../constants"

function YTPlayer({setUsers}) {
    const [socket, setSocket] = useState()
    const [playerState, setPlayerState] = useState(null)
    const [ytPlayer, setYtPlayer] = useState()
    const [playerStartingTime, setPlayerStartingTime] = useState(0)


    const videoTimeStack = useRef([])

    useEffect(() => {
        // setSocket(openSocket("http://localhost:5000"))
        setSocket(openSocket("http://192.168.1.37:5000"))
        console.log("SOCKET INITIATED", socket)
        // setSocket(openSocket())
    }, [])

    useEffect(() => {
        if (socket) {
            console.log("SOCKET")
            socket.on("starting-time", (currentServerTime) => {
                console.log(currentServerTime, ytPlayer)
                setPlayerStartingTime(currentServerTime)
            })

            socket.on("users", (users) => {
                console.log(users)
                setUsers(users)
            })
        }

        if (socket && ytPlayer) {
            console.log("SOCKET LISTENING")
            socket.on("set-player-status", (playerState) => {
                console.log(playerState)
                setPlayerState(playerState)
            })
            socket.on("set-player-current-time", (playerCurrentTime) => {
                console.log("set-player-current-time")
                if (ytPlayer) {
                    console.log("coming from serveR: " + playerCurrentTime)
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
                        console.log("player current time is updated")
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
                    // console.log({ shouldEmitTime })
                    console.log(videoTimeStack.current, {
                        dif:
                            videoTimeStack.current[1] -
                            videoTimeStack.current[0]
                    })

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
            console.log(playerStartingTime)
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
        console.log("PLAYER INITIATED")
    }

    return (
        <div className="w-full h-full bg-red-600 rounded overflow-hidden">
            <div className="absolute text-white">{socket && socket.id}</div>
            <Youtube
                // ref={ref}
                onClick={() => console.log("sa")}
                videoId={"_mU6_c9dvac"} // defaults -> null
                // id={string}                       // defaults -> null
                //   className="h-[100%]  bg-blue-100"               // defaults -> null
                containerClassName="h-full" // defaults -> ''
                opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                        //   rel: 0,
                        origin: "https://you-sync.herokuapp.com/",
                        rel: 0,
                        showinfo: 0,
                        ecver: 2,
                        controls: 1,
                        disablekb: 1,
                        iv_load_policy: 3,
                        autoplay: 1,
                        start: 0
                        // https://developers.google.com/youtube/player_parameters
                        //   autoplay: 1,
                    }
                }}
                // defaults -> {}

                onReady={handleOnReady} // defaults -> noop
                // onPlay={handleOnPlay} // defaults -> noop
                // onPause={handleOnPause} // defaults -> noop
                onStateChange={handleStateChange} // defaults -> noop

                // onEnd={func}                      // defaults -> noop
                // onError={func}                    // defaults -> noop
                // onPlaybackRateChange={func}       // defaults -> noop
                // onPlaybackQualityChange={func}    // defaults -> noop
            />
        </div>
    )
}

export default YTPlayer
