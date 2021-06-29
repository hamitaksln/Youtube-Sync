import Head from "next/head"
import Link from "next/link"
import Home from "../components/home"
import Room from "../components/room"
import Header from "../components/header"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initSocket } from "../redux/actions/SocketActions"
import { setVideoId } from "../redux/actions/RoomActions"

function HomePage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initSocket())
        const script = document.createElement("script")
        script.src =
            "https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js"
        script.async = true
        script.onload = () => HockeyStack.init("f7db3b55c41e68271206b6c2503bd7")
        document.head.appendChild(script)
    }, [])

    return (
        <div className="site-container">
            <Head>
                <title>Youtube SYNC</title>
                <meta
                    name="viewport"
                    content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <main className="w-full h-full">
                <Home></Home>
            </main>
        </div>
    )
}

export default HomePage