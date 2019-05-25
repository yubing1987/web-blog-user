import React, {Component} from 'react';
import {Menu, Empty} from 'antd';
import {NavLink} from 'react-router-dom'
import marked from 'marked';
import hljs from 'highlight.js';
import ArticleApi from "../../server/ArticleApi";
import BookApi from "../../server/BookApi";
const SubMenu = Menu.SubMenu;

class BookList extends Component {
    constructor(props){
        super(props);
        this.state= {
            items: [],
            book: {},
            article: {},
            articleId: 0
        };
        BookApi.getGroupById(props.match.params.id)
            .then((data) => {
                if(data.type === 'COLLECTION'){
                    window.location.href = "/collection/detail/" + data.id
                }
                else{
                    this.setState({
                        book: data
                    })
                }
            })
            .catch(() => {});
        BookApi.getGroupArticle(props.match.params.id)
            .then((data) => {
                let articleId = this.props.match.params.articleId;
                if((!articleId || articleId === '0') && data.length > 0){
                    articleId = data[0].articleId;
                    this.loadArticle(articleId);
                }
                else{
                    this.loadByRefId(data, articleId);
                }

                this.setState({
                    items: data,
                    articleId: articleId
                });
            })
            .catch(() => {});
    }
    loadByRefId(data, id){
        for(let item of data){
            console.log(item);
            if(item.id === (+id)){
                this.loadArticle(item.articleId);
                return true;
            }
            if(item.children && item.children.length > 0){
                if(this.loadByRefId(item.children, id)){
                    return true;
                }
            }
        }
        return false;
    }

    loadArticle(id){
        ArticleApi.getArticleById(id)
            .then(data => {
                this.setState({
                    article: data
                });
            })
            .catch(() => {
                this.setState({
                    article: {}
                })
            });
    }

    render(){
        return <div style={{ marginLeft: '250px', marginRight:'200px', minWidth: 500, marginTop: 0, marginBottom: 50, background: '#ffffff', boxShadow:'2px 2px 30px #ccc' }}>
            {
                this.state.items.length > 0 ?<Menu
                    style={{
                        'width': '280px',
                        'position': 'fixed',
                        'left': '10px',
                        top: 80,
                        boxShadow: '2px 2px 30px #ccc',
                        borderRadius: 8
                    }}
                    mode={'inline'}
                    onClick={(item) => {
                        this.setState({
                            articleId: item.key
                        });
                        this.loadArticle(item.item.props.data.articleId);
                    }
                    }
                    selectedKeys={["" + this.state.articleId]}
                    defaultOpenKeys={['']}
                >
                    {this.makeMenu(this.state.items || [])}
                </Menu>

                : null
            }
            {
                this.state.items.length > 0 ?<div
                    style={{'padding': '20px 40px', minHeight: window.height}}
                    id="content"
                    className="article-detail"
                    dangerouslySetInnerHTML={{
                        __html: this.state.article.content ? marked(this.state.article.content) : null,
                    }}
                />
                    : <Empty style={{'padding':'20px'}}/>
            }
        </div>
    }

    makeMenu(items){
        return items.map(item =>
                item.children && item.children.length === 0?
                    <Menu.Item key = {item.id} data={item}><NavLink to={"/book/detail/" + this.state.book.id + "/" + item.id}>{item.article.title}</NavLink></Menu.Item>
                    :
                    <SubMenu
                        className={item.id === this.state.articleId?'ant-menu-item-selected':''}
                        onTitleClick={() => {
                        console.log(item);
                        this.setState({
                            articleId: item.id
                        });
                        this.loadArticle(item.articleId);
                    }}  key = {item.id} title={<NavLink style={{display:'block'}} to={"/book/detail/" + this.state.book.id + "/" + item.id}>{item.article.title}</NavLink>}>
                        {this.makeMenu(item.children)}
                    </SubMenu>

        );
    }
    componentWillMount() {
        // marked相关配置
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function(code) {
                return hljs.highlightAuto(code).value;
            },
        });
    }
}


export default BookList;