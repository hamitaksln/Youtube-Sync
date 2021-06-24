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
            <main
                // style={{ display: "grid", gridTemplateRows: "1fr 2fr" }}
                className="w-full h-full flex flex-col"
            >
                <div className="w-full h-24">
                    <Header></Header>
                </div>
                <div className="w-full h-full bg-gray-500">
                    <Room></Room>
                </div>
            </main>
        </div>
    )
}

export default HomePage
