import Router from "next/router"

function YouSyncButton() {
    return (
        <div
            onClick={() => Router.push("/")}
            className="w-36 text-white flex justify-center rounded border px-2 text-2xl font-mono hover:bg-red-900 cursor-pointer select-none"
        >
            <span>YOU SYNC</span>
        </div>
    )
}

export default YouSyncButton
