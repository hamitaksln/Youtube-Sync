import { useState, useEffect, useRef } from "react"
import Youtube from "react-youtube"
import openSocket from "socket.io-client"
import { PLAYER_STATE } from "../../constants"

function YTPlayer() {
    const [socket, setSocket] = useState()
    const [playerState, setPlayerState] = useState(null)
    const [ytPlayer, setYtPlayer] = useState()
    const [serverPlayerState, setServerPlayerState] = useState()

    const videoTimeStack = useRef([])

    useEffect(() => {
        setSocket(openSocket("http://localhost:5000"))
        // setSocket(openSocket())
    }, [])

    useEffect(() => {
        if (socket) {
            // socket.on("video-play-status", (playerStatus) => {
            //     // console.log(playerStatus);
            //     setPlayerState(playerStatus)
            //     setIsVideoPlaying(playerStatus)
            //     setPlayer({ play: playerStatus, server: true })
            // })

            socket.on("set-player-status", (playerState) => {
                console.log(playerState)
                // setServerPlayerState(playerState)
                setPlayerState(playerState)
                // setPlayerState({ status: playerState, fromServer: true })
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
            // if (!playerState.fromServer) {
            //     socket.emit("set-player-status", playerState)
            // } else {
            //     setPlayerState((prevValue) => ({
            //         ...prevValue,
            //         fromServer: false
            //     }))
            // }
            if (playerState === "playing") {
                ytPlayer.playVideo()

                // socket.emit("set-player-status",playerState)
            } else if (playerState === "paused") {
                ytPlayer.pauseVideo()
            }
        }
    }, [socket, ytPlayer, playerState])

    const handleTimeChanging = (player) => {
        function updateTime() {
            //   var oldTime = videoTime;
            if (player && player.getCurrentTime) {
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

                    // if (shouldEmitTime) {
                    //     socket.emit(
                    //         "video-current-time",
                    //         player.getCurrentTime()
                    //     )
                    // }
                }
                // else {
                //     setShouldEmitTime(true)
                // }
            }
        }
        setInterval(updateTime, 1000)
    }

    const handleStateChange = (event) => {
        const playerState = PLAYER_STATE[event.data]
        setPlayerState(playerState)
    }

    const handleOnReady = (event) => {
        const player = event.target
        setYtPlayer(player)
        handleTimeChanging(player)
    }

    return (
        <div className="w-full h-full bg-red-600 rounded overflow-hidden">
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
