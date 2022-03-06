const connectionService = require('./connectionService');

module.exports = {

    updateWelcomeText: async function (welcomeMessage) {
        promisePool = await connectionService.GetConnectionPool();
        await promisePool.execute("UPDATE TextContent SET WelcomeMessage=?", [welcomeMessage]);
    },

    getWelcomeText: async function () {
        promisePool = await connectionService.GetConnectionPool();       
        const [welcomeMessage] = await promisePool.execute("SELECT WelcomeMessage FROM TextContent");
        return welcomeMessage;
    }

}