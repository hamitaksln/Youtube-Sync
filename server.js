require('dotenv').config()

const PORT = process.env.PORT || 8080;

const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { Server } = require("socket.io");
const shortid = require('shortid');
const youtubeRoute = require("./routes/youtube");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getAllUsers,
} = require("./utils/users");
const {
    roomCreate,
    getCurrentRoom,
    roomDelete,
    getRooms,
} = require("./utils/rooms");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "./client/out")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/out/index.html"));
});

app.get("/rooms/:pid", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/out/rooms/[pid].html"));
});

app.use("/api/youtube", youtubeRoute);

const server = app.listen(PORT, () =>
    console.log(`Server listening on ${PORT}`)
);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    const checkEmptyRooms = () => {
        const rooms = getRooms();
        rooms.forEach((room) => {
            if (getRoomUsers(room.id).length === 0) {
                const date = new Date();
                console.log(
                    `${room.id} is empty for ${
                        (date - room.lastLeaveDate) / 1000
                    } seconds.`
                );

                if ((date - room.lastLeaveDate) / 1000 >= 5) {
                    roomDelete(room.id);
                }
            }
        });
    };

    checkEmptyRooms();

    socket.on("join-room", (roomId) => {
        if (getAllUsers().find((user) => user.id === socket.id)) {
            return;
        }
        const user = userJoin(socket.id, "username", roomId);
        const room = getCurrentRoom(user.roomId);
        socket.join(user.roomId);

        socket.broadcast.to(user.roomId).emit("new-message", {
            username: user.id,
            text: "New user",
            color: "#FFFFF",
        });

        console.log(
            `user-joined ${socket.id} total rooms: ${
                getRooms().length
            } total users: ${getAllUsers().length}`
        );
        io.to(user.roomId).emit("users", getRoomUsers(user.roomId));

        const currentPlayerTime = room.playerTime.current;
        const roomVideoId = room.videoId;
        if (currentPlayerTime) {
            socket.emit("starting-time", currentPlayerTime);
        }

        if (roomVideoId) {
            socket.emit("room-video-id", room.videoId);
        }
    });

    socket.on("change-video-id", (videoId) => {
        const user = getCurrentUser(socket.id);
        const room = getCurrentRoom(user.roomId);

        room.videoId = videoId;
        io.to(user.roomId).emit("room-video-id", room.videoId);
    });

    socket.on("check-if-room-exists", (roomId) => {
        const rooms = getRooms();
        const isRoomFound = rooms.some((room) => room.id === roomId);
        socket.emit("check-if-room-exists", { isRoomFound, roomId });
    });

    socket.on("create-room", () => {
        const roomId = shortid.generate()
        const date = new Date();
        

        const room = roomCreate(roomId, date, socket.id);
        console.log(`room-created ${roomId}`);
        socket.emit("room-created", room.id);
    });

    socket.on("new-message", (message) => {
        const user = getCurrentUser(socket.id);
        console.log(message);
        io.to(user.roomId).emit("new-message", {
            username: user.id,
            text: message.text,
            color: message.color,
        });
    });

    socket.on("update-server-time", (playerCurrentTime) => {
        const user = getCurrentUser(socket.id);
        const users = getRoomUsers(user.roomId);
        const room = getCurrentRoom(user.roomId);

        if (socket.id !== users[0].id) return;

        room.playerTime.current = playerCurrentTime;
        console.log(`Current time: ${playerCurrentTime}`);
    });

    socket.on("set-player-status", (playerState) => {
        const user = getCurrentUser(socket.id);
        const room = getCurrentRoom(user.roomId);

        room.playerStatus.previous = room.playerStatus.current;
        const previousPlayerStatus = room.playerStatus.previous;
        const currentPlayerStatus = playerState;
        room.playerStatus.current = currentPlayerStatus;

        if (previousPlayerStatus && currentPlayerStatus) {
            if (previousPlayerStatus !== currentPlayerStatus) {
                const previousPlayerUpdated = room.playerStatus.last_updated;
                const currentPlayerUpdated = new Date();
                room.playerStatus.last_updated = currentPlayerUpdated;

                if (previousPlayerUpdated && currentPlayerUpdated) {
                    const timeDifference =
                        (currentPlayerUpdated - previousPlayerUpdated) / 1000;
                    if (timeDifference < 0.15) return;
                }

                console.log(currentPlayerStatus);
                socket.broadcast
                    .to(room.id)
                    .emit("set-player-status", playerState);
            }
        }
    });

    socket.on("set-player-current-time", (playerCurrentTime) => {
        const user = getCurrentUser(socket.id);
        const room = getCurrentRoom(user.roomId);

        room.playerTime.previous = room.playerTime.current;
        const previousPlayerTime = room.playerTime.previous;
        const currentPlayerTime = playerCurrentTime;
        room.playerTime.current = currentPlayerTime;
        if (previousPlayerTime !== null && currentPlayerTime !== null) {
            const timeDifference = Math.abs(
                previousPlayerTime - currentPlayerTime
            );
            if (timeDifference > 1.1) {
                if (!playerCurrentTime) return;
                console.log(`Current time: ${currentPlayerTime}`);
                socket.broadcast
                    .to(room.id)
                    .emit("set-player-current-time", playerCurrentTime);
            }
        }
    });

    const leaveOrDisconnect = () => {
        const user = userLeave(socket.id);

        if (user) {
            const room = getCurrentRoom(user.roomId);
            room.lastLeaveDate = new Date();
            io.to(user.roomId).emit("new-message", {
                username: user.id,
                text: "User left",
                color: "#FFFFF",
            });

            io.to(user.roomId).emit("users", getRoomUsers(user.roomId));
            console.log(
                `user-disconnected ${socket.id} total rooms: ${
                    getRooms().length
                } total users: ${getAllUsers().length}`
            );
        }
    };

    socket.on("user-leave", () => {
        leaveOrDisconnect();
    });

    socket.on("disconnect", () => {
        leaveOrDisconnect();
    });
});
