import Request from "../utils/Request"

let request = new Request();
class ArticleApi{
    static queryArticleList(page, size, key, hideLoading){
        return request.get("/api/article/list.json",{page: page, size: size, key: key}, hideLoading);
    }

    static getArticleById(id){
        return request.get("/api/article/" + id + ".json");
    }
}

export default ArticleApi;