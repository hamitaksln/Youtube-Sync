import Head from "next/head"
import Home from "../components/home"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initSocket } from "../redux/actions/SocketActions"

function HomePage() {
    const socket = useSelector((state) => state.socketReducer.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        if (socket === null) {
            dispatch(initSocket())
        }
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
