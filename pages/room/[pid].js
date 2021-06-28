import { useRouter } from "next/router"
import Room1 from "../../components/room"

const Room = () => {
    const router = useRouter()
    const { pid } = router.query
    console.log(pid)
    return (
        <div className="w-full h-full bg-blue-400">
            {/* <p className="bg-blue-200 text-black">Post: {pid}</p> */}
            <Room1 pid={pid}></Room1>
        </div>
    )
}

export default Room
