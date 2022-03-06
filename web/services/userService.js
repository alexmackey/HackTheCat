const connectionService = require('./connectionService');

module.exports = {

    get: async function (username) {

        var sql = "SELECT Username FROM Users where Username='" + username + "'";
        console.log(sql);

        promisePool = await connectionService.GetConnectionPool();
        const [users] = await promisePool.execute(sql);
        return users;
    },

    signin: async function (username, password) {

        var promisePool = await connectionService.GetConnectionPool();
        var sql = "SELECT * FROM Users WHERE username='" + username + "' AND password='" + password + "'";
        console.log(sql);

        const [results] = await promisePool.execute(sql);

        return results;
    },

    updatePassword: async function (newPassword, userId) {
        const promisePool = await connectionService.GetConnectionPool();
        await promisePool.execute("Update Users SET Password=? WHERE UserId=?", [newPassword, userId]);
    },

    updateProfile: async function (email, username, userId) {
        const promisePool = await connectionService.GetConnectionPool();
        await promisePool.execute("Update Users SET email=?, username=? WHERE UserId=?", [email, username, userId]);
    }
}