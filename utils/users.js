const users = [];

const userJoin = (id, username, roomId) => {
    const user = { id, username, roomId };
    
    users.push(user);
    return user;
};

const getCurrentUser = (id) => {
    return users.find((user) => user.id === id);
};

const userLeave = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getRoomUsers = (roomId) => {
    return users.filter((user) => user.roomId === roomId);
};

const getAllUsers = () => {
    return users;
};

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getAllUsers,
};
