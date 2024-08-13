const {gql} = require("apollo-server-express");

const typeDefs = gql`
type Query {

    getCorps: [Corps]

    insertCorp(
        corpName: String!
        companyRegNo: String!
    ): DateResult

    updateCorp(
        no: ID!
        corpId: String!
        corpName: String!
        companyRegNo: String!
    ): DateResult

    deleteCorp(no: ID!): DateResult

    getUsers: [Users]

    insertUser(
        userId: String!
        userPW: String!
        corpId: String!
        userName: String
        company: String
        userName: String
        userEmail: String
        userMobile: String
        userLevel: String
    ): DateResult

    deleteUser(no: ID!): DateResult

    getPosts: [Posts]

    getPostsByCorp(Category: String): [Posts]

    readPost(no: ID): PostAndComents
    
    insertPost(
        userId: String!
        title: String
        contents: String
        files: String
        writer: String
        counter: String
        parentPost: String
        category: String
    ): DateResult

    updatePost(
        no: ID!
        title: String
        contents: String
        uid: String
    ): DateResult

    deletePost(no: ID!): DateResult

    selectComent(postId: Int): [Coment]

    getPostsByCorpPaging(
        category: String
        curPage: Int
        search: String
        pageSize: Int
        postId: Int
    ): PostsPaging

}

type Mutation{
    login(
        userId: String!
        password: String!   
    ): Message

    getDecodeToken(token:String!): Users

    updateUser(
        no: ID!
        userPW: String
        userName: String
        userEmail: String
        userMobile: String
        userId: String
    ): DateResult

    insertComent(
        postId: String
        coment: String
        uId: String
        writer: String
    ): DateResult

    deleteComent(no: ID!): DateResult
}


type Corps {
    no: ID!
    corpId: String!
    corpName: String!
    companyRegNo: String!
    createdDate: String
    modifiedDate: String
}

type Users {
    no: ID!
    company: String
    userId:String
    corpId:String
    userPW:String
    userName:String
    userEmail:String
    userMobile:String
    userLevel:String
    categoryCreatedDate:String
    modifiedDate:String
}

type Posts {
    no: ID!
    num: String
    userId: String!
    title:String
    contents:String
    files:String
    writer:String
    counter:String
    parentPost:String
    category:String
    createdDate:String
    modifiedDate:String
}

type DateResult{
    resultCount: Int!
}

type Message {
        token: String
        user: Users
    }

type Coment {
    no: ID
    postId: String
    coment: String
    userId: String
    writer: String
    createdDate:String
    modifiedDate:String
}

type PostAndComents{
    post: Posts
    coments: [Coment]
}

type Paging {
    curPage: Int
    page_list_size: Int
    page_size: Int
    totalPage: Int
    startPage: Int
    endPage: Int
    no: Int
    totalCount: Int
}

type PostsPaging {
    post: [Posts]
    paging: Paging
    selectComent: [Coment]
}

`;

module.exports = [typeDefs];