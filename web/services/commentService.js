const connectionService = require('./connectionService');

module.exports = {

    add: async function (productId, comment) {
        console.log(productId);
        console.log(comment);
        
        promisePool = await connectionService.GetConnectionPool();
        await promisePool.execute("INSERT INTO Comments (ProductId, Comment, CommentDate) Values (?,?, NOW())", [productId, comment]);
    },

    get: async function (productId) {
        promisePool = await connectionService.GetConnectionPool();
        const [commentData] = await promisePool.execute("SELECT * FROM Comments WHERE ProductID=? ORDER BY CommentDate DESC", [productId]);
        return commentData;
    }

}