const connectionService = require('./connectionService');

module.exports = {

    add: async function (product) {

        promisePool = await connectionService.GetConnectionPool();
        await promisePool.execute("INSERT INTO Products (ProductName, SmallImageUrl, LargeImageUrl, Cost, IsActive) Values (?,?,?,?,?)", [product.productName, product.smallImageUrl, product.largeImageUrl, product.cost, true]);
    },

    getAll: async function (orderByClause) {
       
        var promisePool = await connectionService.GetConnectionPool();

        var sql = "SELECT * FROM Products WHERE isActive=1 ORDER BY " + orderByClause;
        console.log(sql);

        const [products] = await promisePool.execute(sql);
        return products;
    },

    get: async function (productId) {

        promisePool = await connectionService.GetConnectionPool();
        const sql = "SELECT * FROM Products WHERE ProductID=" + productId;
        console.log(sql);
        const [products] = await promisePool.execute(sql);
        return products;
    }
}