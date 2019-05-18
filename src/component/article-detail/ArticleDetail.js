import React, {Component} from 'react';
import {List} from 'antd';
import ArticleApi from "../../server/ArticleApi";

import marked from 'marked';
import hljs from 'highlight.js';

class ArticleDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            article: {}
        };
        this.loadArticle(props.match.params.id);
    }

    loadArticle(id){
        ArticleApi.getArticleById(id)
            .then((data) => {
                this.setState({
                    article: data
                });
                window.document.title = data.title;
            })
            .catch(()=>{})
    }

    render(){
        return <div style={{ width: '1000px', marginLeft: 'auto', marginRight:'auto', marginTop: 0, marginBottom: 50, background: '#ffffff', boxShadow:'2px 2px 30px #ccc' }}>
            <div className="article-title">{this.state.article.title}</div>
            <div
                style={{'padding': '20px 40px'}}
                id="content"
                className="article-detail"
                dangerouslySetInnerHTML={{
                    __html: this.state.article.content ? marked(this.state.article.content) : null,
                }}
            />
        </div>
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


export default ArticleDetail;