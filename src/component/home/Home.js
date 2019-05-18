import React, {Component} from 'react';
import {NavLink, Redirect, Route} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import ArticleList from "../article-list/ArticleList";
import BookList from "../book-list/BookList";
import CollectionList from "../collection-list/CollectionList";
import ArticleDetail from "../article-detail/ArticleDetail";
import BookDetail from "../book-detail/BookDetail";
import CollectionDetail from "../collection-detail/CollectionDetail";

const { Header, Content, Footer } = Layout;

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            menu:[
                {
                    name: "全部文章",
                    link: "/article/list",
                    startKey: "/article"
                },
                {
                    name: "书籍",
                    link: "/book/list",
                    startKey: "/book"
                },
                {
                    name: "专辑",
                    link: "/collection/list",
                    startKey: "/collection"
                }
            ]
        }
    }

    render(){
        let select = null;
        this.state.menu.forEach(item => {
           if(window.location.pathname.startsWith(item.startKey)){
               select= item.link;
           }
        });
        if(!select){
            return <Redirect to={"/article/list"}/>;
        }
        return<Layout className="layout">
            <Header  style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo"></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[select]}
                    style={{ lineHeight: '64px' }}
                >
                    {
                        this.state.menu.map(item =>
                            <Menu.Item key={item.link}><NavLink to={item.link}>{item.name}</NavLink></Menu.Item>
                        )
                    }
                </Menu>
            </Header>
            <Content style={{ marginLeft: '50px', marginRight:'50px', marginTop: 64}}>
                <div style={{ padding: 24, minHeight: "100%" }}>
                    <Route path="/article/list" component={ArticleList}/>
                    <Route path="/article/detail/:id" component={ArticleDetail}/>
                    <Route path="/book/list" component={BookList}/>
                    <Route path="/book/detail/:id/:articleId" component={BookDetail}/>
                    <Route path="/collection/list" component={CollectionList}/>
                    <Route path="/collection/detail/:id" component={CollectionDetail}/>
                </div>
            </Content>
        </Layout>
    }
}


export default Home;