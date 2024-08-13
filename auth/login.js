const jwt = require('jsonwebtoken');
const db = require('../db/dbCreate');
const sql = require('../db/dbExe');
const SECRET_KEY = "SeCrEtKeY1234";

module.exports={
    loginExe: async (userId,password) => {
        let conn;
        try {
            conn = await db.getPoolConnection();
            const queryString =
                "SELECT * FROM ojt.user " +
                "WHERE userId = " + conn.escape(userId) + 
                " AND userPW = md5(" + conn.escape(password) + ")";

            const result = await conn.query(queryString);

            if(result.length == 0) {
                throw new Error("No such userId");
            }
            let user = result.shift();

            const token = jwt.sign({
                No : user.no,
            },SECRET_KEY,{
                expiresIn: '7d'
            })

            return {
                token,
                user
            };
        } catch (error) {
            console.log(`loginExe erorr : ${error}`);
        }
        finally{
            if(conn) db.endPoolConnection(conn);
        }
    },

    checkAuth: async (token) => {
        try {
            if (!token) throw new Error('Please Sign in.');

            try {
                const decoded = jwt.verify(token, SECRET_KEY);
                return decoded;  
            } catch (error) {
                console.log(`invalid token error : ${error}`);
                throw error;
            }
             
        } catch (error) {
            console.log(`no token error : ${error}`);
            throw error;
        }
    }


}