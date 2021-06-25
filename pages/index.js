import Head from "next/head"
import Room from "../components/room"
import Header from "../components/header"
import {useEffect} from "react"

function HomePage() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js";
        script.async = true;
        script.onload = () => HockeyStack.init('f7db3b55c41e68271206b6c2503bd7');
        document.head.appendChild(script);
      }, []);

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
