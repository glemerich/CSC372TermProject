const users = [];

exports.getAllUsers = () => users;
exports.getUserById = (id) => users.find((user) => user.id === parseInt(id));
exports.createUser = (newUser) => {
    const id = users.length + 1;
    const user = { id, ...newUser };
    users.push(user);
    return user;
};
exports.updateUser = (id, updatedUser) => {
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
    }
    return null;
};
exports.deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === parseInt(id));
    if (index !== -1) users.splice(index, 1);
};