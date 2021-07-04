const rooms = [];

const roomCreate = (id, createdDate, owner) => {
    const room = {
        id,
        createdDate,
        lastLeaveDate: createdDate,
        owner,
        videoId: null,
        playerStatus: {
            previous: null,
            current: null,
            last_updated: null,
        },
        playerTime: {
            previous: null,
            current: null,
            last_updated: null,
        },
    };

    rooms.push(room);
    return room;
};

const getCurrentRoom = (id) => {
    return rooms.find((room) => room.id === id);
};

const roomDelete = (id) => {
    const index = rooms.findIndex((room) => room.id === id);

    if (index !== -1) {
        return rooms.splice(index, 1)[0];
    }
};

const getRooms = () => {
    return rooms;
};

module.exports = {
    roomCreate,
    getCurrentRoom,
    roomDelete,
    getRooms,
};
