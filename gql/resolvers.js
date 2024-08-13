const sql = require("../db/dbExe");
const logger = require("../log/winston");
const log = (msg) => logger.info(msg);
const login = require("../auth/login");

const resolvers = {
    Query:{
        getCorps: async ()=>{
            const res = await sql.getCorpExe();
            return res;
        },
        
        insertCorp: async (_, {
            CorpName = null,
            CompanyRegNo = null
        })=>{
            try {
                const corpData = {
                    "CorpName": CorpName,
                    "CompanyRegNo": CompanyRegNo
                };
                const res = await sql.insertCorpExe(corpData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("InsertCorp error : " + err);
                throw err;
            }
        },

        updateCorp: async (_, {
            No = null,
            CorpId = null,
            CorpName = null,
            CompanyRegNo = null
        })=>{
            try {
                const corpData = {
                    "No": No,
                    "CorpId": CorpId,
                    "CorpName": CorpName,
                    "CompanyRegNo": CompanyRegNo
                };
                const res = await sql.updateCorpExe(corpData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("UpdateCorp error : " + err);
                throw err;
            }
        },

        deleteCorp: async (_, {
            No = null
        })=>{
            try {
                const corpData = {"No": No};
                const res = await sql.deleteCorpExe(corpData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("DeleteCorp error : " + err);
                throw err;
            }
        },

        getUsers: async ()=>{
            const res = await sql.getUserExe();
            return res;
        },

        insertUser: async (_, {
            UserId = null,
            UserPW = null,
            CorpId = null, 
            Company = null, 
            UserName = null,
            UserEmail = null,
            UserMobile = null,
            UserLevel = null
        })=>{
            try {
                const userData = {
                    "UserId": UserId,
                    "UserPW": UserPW,
                    "CorpId": CorpId,
                    "Company": Company,
                    "UserName": UserName,
                    "UserEmail": UserEmail,
                    "UserMobile": UserMobile,
                    "UserLevel": UserLevel
                };
                const res = await sql.insertUserExe(userData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("InsertUser error : " + err);
                throw err;
            }
        },

        deleteUser: async (_, {
            No = null
        })=>{
            try {
                const userData = {"No": No};
                const res = await sql.deleteUserExe(userData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("DeleteUser error : " + err);
                throw err;
            }
        },

        getPosts: async ()=>{
            const res = await sql.getPostExe();
            return res;
        },
        
        getPostsByCorp: async (_,Corp)=>{
            const res = await sql.getPostsListExe(Corp.Category);
            return res;
        },

        readPost: async (_, postId)=>{
            const res = await sql.getReadPostExe(postId);
            return res;
        },

        insertPost: async (_, {
            userId = null,
            title = null,
            contents = null, 
            files = null, 
            writer = null,
            counter = null,
            category = null
        })=>{
            try {
                const postData = {
                    "userId": userId,
                    "title": title,
                    "contents": contents,
                    "files": files,
                    "writer": writer,
                    "counter": counter,
                    "category": category
                };
                const res = await sql.insertPostExe(postData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("InsertCorp error : " + err);
                throw err;
            }
        },

        updatePost: async (_, {no, title, contents, uid})=>{
            try {
                const postData = {
                    "no": no,
                    "title": title,
                    "contents": contents,
                    "uid": uid
                };
                const res = await sql.updatePostExe(postData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("UpdatePost error : " + err);
                throw err;
            }
        },

        deletePost: async (_, {
            no = null
        })=>{
            try {
                const postData = {"no": no};
                const res = await sql.deletePostExe(postData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("DeleteUser error : " + err);
                throw err;
            }
        },

        selectComent: async (_, param)=>{
            try {
                const res = await sql.selectComentExe(param);
                return res;
            } catch (err) {
                log("selectComent error : " + err);
                throw err;
            }
        },

        getPostsByCorpPaging: async (_, param)=>{
            try {
                const res = await sql.getPostsByCorpPagingExe(param);
                return res;
            } catch (err) {
                log("getPostsByCorpPaging error : " + err);
                throw err;
            }
        }

    },
    Mutation: {
        login: async (_, {userId, password})=>{
            try {
                let res = await login.loginExe(userId, password);

                if (res === undefined) {
                    throw new Error("NO such user.");
                }
                return res;
            } catch (error) {
                console.log(`User Login is failed because of this error : ${error}`);
                throw error;
            }
        },

        getDecodeToken: async (_, {token})=>{
            try {
                let result = await login.checkAuth(token);
                let user = await sql.getUserByIdExe(result.No);
                return user[0];
            } catch (error) {
                console.log(`User Login is failed because of this error : ${error}`);
                throw error;
            }
        },
        
        updateUser: async (_, {No, UserPW, UserName, UserEmail, UserMobile, UserId })=>{
            try {
                const userData = {
                    "No": No,
                    "UserPW": UserPW,
                    "UserName": UserName,
                    "UserEmail": UserEmail,
                    "UserMobile": UserMobile,
                    "UserId": UserId
                };
                const res = await sql.updateUserExe(userData);
                await sql.updatePostUserNameExe(userData);
                return { resultCount: res.affectedRows };
            } catch (err) {
                log("UpdateUser error : " + err);
                throw err;
            }
        },

        insertComent: async (_, params)=>{
            try {
                const comentData = {
                    "postId": params.postId,
                    "coment": params.coment,
                    "uId": params.uId,
                    "writer": params.writer
                }
                const res = await sql.insertComentExe(comentData)
                return { resultCount: res.affectedRows }
            } catch (err) {
                log("insertComent error : " + err)
                throw err
            }
        },

        deleteComent: async (_, no)=>{
            try {
                const res = await sql.deleteComentExe(no)
                return { resultCount: res.affectedRows }
            } catch (err) {
                log("deleteComent error : " + err)
                throw err
            }

        }


    }
}

module.exports = [resolvers];