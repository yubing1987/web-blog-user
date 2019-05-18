import Request from "../utils/Request"

let request = new Request();

class BookApi {
    static getBooks(page, key){
        return request.get("/api/group/list.json", {type: 'BOOK', page: page, size: 10, key: key});
    }

    static getCollection(page, key){
        return request.get("/api/group/list.json", {type: 'COLLECTION', page: page, size: 10, key: key});
    }

    static getGroupArticle(id){
        return request.get("/api/group/ref/" + id + "/tree.json");
    }

    static getGroupById(id){
        return request.get("/api/group/" + id);
    }

    static getGroupArticleList(page, groupId){
        return request.get("/api/group/ref/list", {page: page, size: 10, groupId: groupId});
    }
}

export default BookApi;