const db = require("./dbCreate")
const logger = require("../log/winston")
const log = (msg) => logger.info(msg)
const pagenation = require("./paging")

module.exports = {
    
    getCorpExe: async ()=>{
        try {
            const queryString = "SELECT * FROM ojt.corp";
            const res = await db.exe(queryString);
            log("MariaDB [ GetCorpExe ] executed.");
            return res;
        } catch (err) {
            console.log("MariaDB GetCorpExe error : " + err);
            log("MariaDB [ GetCorpExe ] error : " + err);
            throw err;
        }
    },

    insertCorpExe: async (corpData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = "INSERT INTO ojt.corp (corpId, corpName, companyRegNo) VALUES (" + 
            conn.escape(corpData["companyRegNo"]) + "," +
            conn.escape(corpData["corpName"]) + "," +
            conn.escape(corpData["companyRegNo"]) + ")";

            res = await conn.query(queryString);
            log("MariaDB [ InsertCorpExe ] executed.");
            return res;
        } catch (err) {
            console.log("InsertCorp error : " + err);
            throw err;
        } finally {
            log("InsertCorp success : affectedRows = " + 
                res["affectedRows"] + ", insertId = " + 
                res["insertId"] + ", warningStatus = " + 
                res["warningStatus"]);
            if (conn) await db.endPoolConnection(conn);
        }
    },

    updateCorpExe: async (corpData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = "UPDATE ojt.corp SET " +
            "corpId=" + conn.escape(corpData["corpId"]) + 
            ",corpName=" + conn.escape(corpData["corpName"]) + 
            ",companyRegNo=" + conn.escape(corpData["companyRegNo"]) + 
            "WHERE no=" + conn.escape(corpData["no"]);

            res = await conn.query(queryString);
            log("MariaDB [ UpdateCorpExe ] executed.");
            return res;
        } catch (err) {
            console.log("UpdateCorp error : " + err);
            throw err;
        } finally {
            log("UpdateCorp success : affectedRows = " + res["affectedRows"] );
            if (conn) await db.endPoolConnection(conn);
        }
    },

    deleteCorpExe: async (corpData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = "DELETE FROM ojt.corp WHERE no=" + conn.escape(corpData["no"]);
            res = await conn.query(queryString);
            log("MariaDB [ DeleteCorpExe ] executed.");
            return res;
        } catch (err) {
            console.log("DeleteCorp error : " + err);
            throw err;
        } finally {
            log("DeleteCorp success : affectedRows = " + res["affectedRows"]);
            if (conn) await db.endPoolConnection(conn);
        }
    },

    getUserExe: async ()=>{
        try {
            const queryString = "SELECT * FROM ojt.user";
            const res = await db.exe(queryString);
            log("MariaDB [ GetUserExe ] executed.");
            return res;
        } catch (err) {
            console.log("MariaDB GetUserExe error : " + err);
            log("MariaDB [ GetUserExe ] error : " + err);
            throw err;
        }
    },

    getUserByIdExe: async (no)=>{
        try {
            const queryString = "SELECT no, userId, company, userName, userEmail,  userMobile FROM ojt.user WHERE no = " + no;
            const result = await db.exe(queryString);
            log('getUserByIdExe executed.');
            return result;
        }
        catch (err) {
            console.error("getUserByIdExe Error: " + err);
            throw err;
        }
    },

    insertUserExe: async (userData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = "INSERT INTO ojt.user (" +
            "company, userId, userPW, corpId, userName, userEmail, userMobile) VALUES (" + 
            conn.escape(userData["company"]) + "," +
            conn.escape(userData["userId"]) + "," +
            "md5(" + conn.escape(userData["userPW"]) + ")," +
            conn.escape(userData["corpId"]) + "," +
            conn.escape(userData["userName"]) + "," +
            conn.escape(userData["userEmail"]) + "," +
            conn.escape(userData["userMobile"]) + ")";

            res = await conn.query(queryString);
            log("MariaDB [ InsertUserExe ] executed.");
            return res;
        } catch (err) {
            console.log("InsertUser error : " + err);
            throw err;
        } finally {
            log("InsertUser success : affectedRows = " + 
                res["affectedRows"] + ", insertId = " + 
                res["insertId"] + ", warningStatus = " + 
                res["warningStatus"]);
            if (conn) await db.endPoolConnection(conn);
        }
    },

    updateUserExe: async (params)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            let queryString;
            if(params.userPW === null || params.userPW === "" || params.userPW === undefined){
                queryString = "UPDATE ojt.user SET " +
                "userName=" + conn.escape(params.userName) +
                ",userEmail=" + conn.escape(params.userEmail) +
                ",userMobile=" + conn.escape(params.userMobile) +
                "WHERE no=" + conn.escape(params.no);
            }else{
                queryString = "UPDATE ojt.user SET " +
                "userPW= md5(" + conn.escape(params.userPW) + ")" +
                ",userName=" + conn.escape(params.userName) +
                ",userEmail=" + conn.escape(params.userEmail) +
                ",userMobile=" + conn.escape(params.userMobile) +
                "WHERE no=" + conn.escape(params.no);
            }

            res = await conn.query(queryString);
            log("MariaDB [ UpdateUserExe ] executed.");
            return res;
        } catch (err) {
            console.log("UpdateCorp error : " + err);
            throw err;
        } finally {
            log("UpdateCorp success : affectedRows = " + res["affectedRows"] );
            if (conn) await db.endPoolConnection(conn);
        }
    },

    updatePostUserNameExe: async (params)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = 
                "UPDATE ojt.post SET " +
                "writer=" + conn.escape(params.userName) +
                "WHERE userId=" + conn.escape(params.userId);

            res = await conn.query(queryString);
            log("MariaDB [ UpdatePostUserNameExe ] executed.");
            return res;
        } catch (err) {
            console.log("UpdatePostUserNameExe error : " + err);
            throw err;
        } finally {
            log("UpdateCorp success : affectedRows = " + res["affectedRows"] );
            if (conn) await db.endPoolConnection(conn);
        }
    },

    deleteUserExe: async (userData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = "DELETE FROM ojt.user WHERE no=" + conn.escape(userData["no"]);
            res = await conn.query(queryString);
            log("MariaDB [ DeleteUserExe ] executed.");
            return res;
        } catch (err) {
            console.log("DeleteUser error : " + err);
            throw err;
        } finally {
            log("DeleteUser success : affectedRows = " + res["affectedRows"]);
            if (conn) await db.endPoolConnection(conn);
        }
    },

    getPostExe: async ()=>{
        try {
            // const queryString = "SELECT * FROM ojt.Post";
            // const res = await db.exe(queryString);
            log("MariaDB [ GetPostExe ] executed.");
            return res;
        } catch (err) {
            console.log("MariaDB GetPostExe error : " + err);
            log("MariaDB [ GetPostExe ] error : " + err);
            throw err;
        }
    },

    getPostsListExe: async (Category)=>{
        try {
            // const totalCount = await db.exe("SELECT COUNT(*)as cnt  FROM ojt.Post WHERE Category='" + Category + "'");
            // const paging = await pagenation.paging(curPage, totalCount[0].cnt);
            
            const queryString = "SELECT no, title, userId, writer, contents, category, DATE_FORMAT(createdDate, '%Y-%m-%d %H:%i:%s')as createdDate, DATE_FORMAT(modifiedDate, '%Y-%m-%d %H:%i:%s')as modifiedDate FROM ojt.post WHERE category='" + Category + "' ORDER BY createdDate DESC";
            const res = await db.exe(queryString);
            log("MariaDB [ getPostsListExe ] executed.");

            return res;
        } catch (err) {
            console.log("getPostsListExe error : " + err);
            throw err;
        }
    },

    getReadPostExe: async (postId)=>{
        try {
            let queryString = `
                SELECT 
                    title, 
                    userId, 
                    writer, 
                    contents, 
                    category, 
                    DATE_FORMAT(createdDate, '%Y-%m-%d %H:%i:%s')as createdDate, 
                    DATE_FORMAT(modifiedDate, '%Y-%m-%d %H:%i:%s')as modifiedDate 
                FROM ojt.post 
                WHERE no=${postId.no}`
            const post = await db.exe(queryString);

            queryString = `
                SELECT
                    no, 
                    coment, 
                    userId, 
                    writer, 
                    DATE_FORMAT(createdDate, '%Y-%m-%d %H:%i:%s')as createdDate, 
                    DATE_FORMAT(modifiedDate, '%Y-%m-%d %H:%i:%s')as modifiedDate
                From ojt.coment
                WHERE postId=${postId.no}
            `
            const coments = await db.exe(queryString)

            log("MariaDB [ getReadPostExe ] executed.");
            return {
                post: post[0],
                coments: coments
            };
        } catch (err) {
            console.log("getReadPostExe error : " + err);
            throw err;
        }
    },

    insertPostExe: async (postData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = `INSERT INTO ojt.post (
            userId, title, contents, files, writer, counter, category) VALUES ( 
            ${conn.escape(postData["userId"])},
            ${conn.escape(postData["title"])},
            ${conn.escape(postData["contents"])},
            ${conn.escape(postData["files"])},
            ${conn.escape(postData["writer"])},
            ${conn.escape(postData["counter"])},
            ${conn.escape(postData["category"])})
            `

            res = await conn.query(queryString);
            log("MariaDB [ InsertPostExe ] executed.");
            return res;
        } catch (err) {
            console.log("InsertPost " + err);
            throw err;
        } finally {
            log("InsertPost success : affectedRows = " + 
                res["affectedRows"] + ", insertId = " + 
                res["insertId"] + ", warningStatus = " + 
                res["warningStatus"]);
            if (conn) await db.endPoolConnection(conn);
        }
    },

    updatePostExe: async (postData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            let queryString = "SELECT userId FROM ojt.post " +
            "WHERE no=" + conn.escape(postData["no"])

            let userId = await conn.query(queryString)
            if(userId[0].userId === postData.uid){
                queryString = "UPDATE ojt.post SET " +
                "title=" + conn.escape(postData["title"]) +
                ",contents=" + conn.escape(postData["contents"]) +
                " WHERE no=" + conn.escape(postData["no"]);
    
                res = await conn.query(queryString);
                log("MariaDB [ UpdatePostExe ] executed.");
                return res;
            }else{
                throw new Error("updataPost-findUserId Error.")
            }
        } catch (err) {
            console.log("UpdatePost error : " + err);
            throw err;
        } finally {
            log("UpdatePost success : affectedRows = " + res["affectedRows"] );
            if (conn) await db.endPoolConnection(conn);
        }
    },

    deletePostExe: async (postData)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection()
            let queryString = `
                DELETE FROM ojt.coment WHERE postId=${conn.escape(postData["no"])}
                `
            res = await conn.query(queryString)
            queryString = `
                DELETE FROM ojt.post WHERE no=${conn.escape(postData["no"])}
            `
            res = await conn.query(queryString)
            log("MariaDB [ DeletePostExe ] executed.");
            return res;
        } catch (err) {
            console.log("DeletePostExe error : " + err);
            throw err;
        } finally {
            log("DeletePost success : affectedRows = " + res["affectedRows"]);
            if (conn) await db.endPoolConnection(conn);
        }
    },

    insertComentExe: async (params)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = "INSERT INTO ojt.coment (" + 
            "postId, coment, userId, writer) VALUES (" +
            conn.escape(params.postId) + "," +
            conn.escape(params.coment) + "," +
            conn.escape(params.uId) + "," +
            conn.escape(params.writer) + ")";
            res = await conn.query(queryString);
            log("MariaDB [ insertComentExe ] executed.");
            return res;
        } catch (err) {
            console.log("insertComentExe error : " + err);
            throw err;
        } finally {
            log("insertComentExe success : affectedRows = " + res["affectedRows"]);
            if (conn) await db.endPoolConnection(conn);
        }
    },

    selectComentExe: async (param)=>{
        let conn;
        let res;
        try {
            conn = await db.getPoolConnection();
            const queryString = 
                "SELECT no, postId, coment, writer, createdDate, modifiedDate " + 
                "FROM ojt.coment " + 
                "WHERE postId=" + conn.escape(param.postId) +
                " ORDER BY modifiedDate DESC";
            res = await conn.query(queryString);
            log("MariaDB [ selectComentExe ] executed.");
            return res;
        } catch (err) {
            console.log("selectComentExe error : " + err);
            throw err;
        } finally {
            log("selectComentExe success.");
            if (conn) await db.endPoolConnection(conn);
        }
    },
    
    getPostsByCorpPagingExe: async (param)=>{
        let conn
        try {
            conn = await db.getPoolConnection()
            await conn.beginTransaction()

            let queryString = 
                `SELECT 
                    SQL_CALC_FOUND_ROWS 
                    no, 
                    @rownum:=@rownum+1 as num,
                    title, 
                    userId, 
                    writer, 
                    contents, 
                    category, 
                    DATE_FORMAT(createdDate, '%Y-%m-%d %H:%i:%s')as createdDate, 
                    DATE_FORMAT(modifiedDate, '%Y-%m-%d %H:%i:%s')as modifiedDate 
                FROM ojt.post, (SELECT @rownum:=0) t
                WHERE category="${param.category}"
                AND title like "%${param.search ? param.search : ''}%"
                ORDER BY num DESC
                LIMIT ${param.curPage}, ${param.pageSize}`
            
            const res = await conn.query(queryString);
            const totalCount = await conn.query("SELECT FOUND_ROWS() as cnt")
            const paging = await pagenation.paging(param.curPage, totalCount[0].cnt)
            log("MariaDB [ getPostsListExe ] executed.")
            return {
                post: res,
                paging: paging
            }
        } catch (error) {
            console.log(error)
            throw new Error
        }finally{
            if(conn){
                conn.end()
            }
        }
    },

    deleteComentExe: async (param)=>{
        let conn
        try {
            conn = await db.getPoolConnection()
            let queryString = `
                DELETE FROM ojt.coment WHERE no=${conn.escape(param.no)}
                `
            let res = await conn.query(queryString)
            log("MariaDB [ deleteComentExe ] executed.")
            return res
        } catch (err) {
            console.log(err)
            throw new Error("deleteComentExe: ", err)
        } finally{
            if(conn){
                conn.end()
            }
        }
    }


}
