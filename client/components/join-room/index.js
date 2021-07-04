import Button from "../../components/ui/button"
import Input from "../../components/ui/input"
function JoinRoom() {
    const handleJoinRoomClick = () => {}

    return (
        <div>
            <Button width="w-[12rem]" click={handleJoinRoomClick}>Join Room</Button>

            <div className="">
                <Input></Input>
            </div>
        </div>
    )
}

export default JoinRoom
