import Head from "next/head"
import Room from "../components/Room"
import Header from "../components/Header"

function HomePage() {
    return (
        <div className="site-container">
            <Head>
                <title>My project</title>
                <meta
                    name="viewport"
                    content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
                />
            </Head>
            <main className="w-full h-full flex flex-col">
                <Header></Header>
                <Room></Room>
            </main>
        </div>
    )
}

export default HomePage
