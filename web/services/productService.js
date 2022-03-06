const connectionService = require('./connectionService');

module.exports = {

    add: async function (product) {

        promisePool = await connectionService.GetConnectionPool();
        await promisePool.execute("INSERT INTO Products (ProductName, SmallImageUrl, LargeImageUrl) Values (?,?,?)", [product.productName, product.smallImageUrl, product.largeImageUrl]);
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

        const [products] = await promisePool.execute("SELECT * FROM Products WHERE ProductID=?", [productId]);
        return products;
    }
}