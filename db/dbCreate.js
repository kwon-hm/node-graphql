const mariaDB = require("mariadb");
const config = require("../config/dev.json");
const logger = require("../log/winston");
const log = (msg) => logger.info(msg);

const pool = mariaDB.createPool({
    host: config.mariaDB.host,
    user: config.mariaDB.user,
    password: config.mariaDB.password,
    database: config.mariaDB.database,
    port: config.mariaDB.port,
    connectionLimit: config.mariaDB.connectionLimit,
    acquireTimeout: config.mariaDB.acquireTimeout,
    waitForConnections: config.mariaDB.waitForConnections
});

module.exports = {
    exe: async function(queryStatement) {
        let conn;
        let result;
        try {
            try {
                conn = await this.getPoolConnection();
            } catch (err) {
                console.log("getPoolConnection error : " + err);
                throw err;
            }
            try {
                result = await conn.query(queryStatement);
                return result;
            } catch (err) {
                console.log("conn.query error : " + err);
                throw err;
            }
        } catch (err) {
            console.log("exe error : " + err);
            throw err;
        } finally {
            try {
                if(conn){
                    await this.endPoolConnection(conn);
                } 
            } catch (err) {
                console.log("this.endPoolConnection error : " + err);
                throw err;
            }
        }
    },
    getPoolConnection: async function() {
        let conn;
        try {
            conn = await pool.getConnection();
            log("MariaDB connection succeed.");
            return conn;
        } catch (err) {
            log("MariaDB pool.getConnection error: " + err);
            throw err;
        }
    },

    endPoolConnection: async function(conn) {
        try {
            if(conn){
                log("MariaDB connection end.");
                await conn.end();
            }
        } catch (err) {
            log("MariaDB connection.end error : " + err);
            throw err;
        }
    }
}