const PORT = process.env.PORT || 5000;

const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const youtubeRoute = require("./routes/youtube");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./utils/users");
const {
    roomCreate,
    getCurrentRoom,
    roomDelete,
    getRooms,
} = require("./utils/rooms");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
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
    socket.on("join-room", (roomId) => {
        const user = userJoin(socket.id, "username", roomId);
        const room = getCurrentRoom(user.roomId);

        socket.join(user.roomId);

        socket.broadcast.to(user.roomId).emit("new-message", {
            username: user.id,
            text: "New user",
            color: "#FFFFF",
        });

        console.log("user-joined", getRoomUsers(user.roomId), room);
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
        // console.log(roomId, rooms);
        const rooms = getRooms();
        const isRoomFound = rooms.some((room) => room.id === roomId);
        socket.emit("check-if-room-exists", isRoomFound);
    });

    socket.on("create-room", () => {
        const roomId = uuidv4();
        const date = new Date();

        const room = roomCreate(roomId, date, socket.id);
        console.log(room);
        socket.emit("room-created", room.id);
    });

    // socket.emit("starting-time", currentServerTime);
    // io.emit("users", users);

    socket.on("new-message", (message) => {
        const user = getCurrentUser(socket.id);
        console.log(message);
        io.to(user.roomId).emit("new-message", {
            username: user.id,
            text: message.text,
            color: message.color,
        });

        // io.to(user.roomId).emit("new-message", {
        //     username: user.id,
        //     text: "New user",
        //     color: "#FFFFF",
        // });
    });

    socket.on("update-server-time", (playerCurrentTime) => {
        const user = getCurrentUser(socket.id);
        const users = getRoomUsers(user.roomId);
        const room = getCurrentRoom(user.roomId);

        if (socket.id !== users[0].id) return;

        room.playerTime.current = playerCurrentTime;
        console.log(room);

        // if (socket.id !== referenceSocketId) return;
        // currentServerTime = currentTime;
    });

    socket.on("set-player-status", (playerState) => {
        const user = getCurrentUser(socket.id);
        const room = getCurrentRoom(user.roomId);

        room.playerStatus.previous = room.playerStatus.current;
        const previousPlayerStatus = room.playerStatus.previous;
        const currentPlayerStatus = playerState;
        room.playerStatus.current = currentPlayerStatus;
        // console.log({ user, room });

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
        console.log({ playerCurrentTime, room });
        if (previousPlayerTime !== null && currentPlayerTime !== null) {
            const timeDifference = Math.abs(
                previousPlayerTime - currentPlayerTime
            );
            if (timeDifference > 1.1) {
                if (!playerCurrentTime) return;
                console.log(currentPlayerTime);
                socket.broadcast
                    .to(room.id)
                    .emit("set-player-current-time", playerCurrentTime);
            }
        }
    });
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.roomId).emit("new-message", {
                username: user.id,
                text: "User left",
                color: "#FFFFF",
            });

            console.log("user disconnected", getRoomUsers(user.roomId));
            io.to(user.roomId).emit("users", getRoomUsers(user.roomId));
        }
    });
});
