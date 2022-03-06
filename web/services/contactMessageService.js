const connectionService = require('./connectionService');

module.exports = {

    add: async function (message) {       
        promisePool = await connectionService.GetConnectionPool();
        await promisePool.execute("INSERT INTO ContactMessages (Message, MessageDate) Values (?, NOW())", [message]);
    },

    getAll: async function () {
        promisePool = await connectionService.GetConnectionPool();
        const [messageData] = await promisePool.execute("SELECT * FROM ContactMessages ORDER BY MessageDate DESC");
        return messageData;
    }

}