import Router from "next/router"

function YouSyncButton() {
    return (
        <div className="w-full">
            <a
                onClick={() => Router.push("/")}
                href="/"
                className="w-[13.8rem] h-[2.5rem] bg-white text-white flex justify-center rounded border px-2 py-1 text-2xl font-mono hover:bg-gray-300 cursor-pointer select-none"
            >
                <img src="/youtube-sync_logo_w_name_t_s40.png" alt="" />
            </a>
        </div>
    )
}

export default YouSyncButton
