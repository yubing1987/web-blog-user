import React, {Component} from 'react';
import {List, Typography} from 'antd';
import BookApi from "../../server/BookApi";

const { Paragraph } = Typography;

class CollectionDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            articles: [],
            total: 0,
            groupId: props.match.params.id
        };
        this.loadArticleList(1);
    }

    loadArticleList(page){
        BookApi.getGroupArticleList(page, this.state.groupId)
            .then((data) => {
                data = (data || {});
                this.setState({
                    articles: data.items,
                    total: data.total
                })
            })
    }

    render(){
        return <div style={{ width: '1000px', marginLeft: 'auto', marginRight:'auto', marginTop: 0, marginBottom: 50, background: '#ffffff' }}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        this.loadArticleList(page);
                    },
                    pageSize: 10,
                    total: this.state.total
                }}
                bordered
                dataSource={this.state.articles}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={
                            <img
                                width={272}
                                alt={item.title}
                                src={"/api/image/" + item.picture}
                            />
                        }
                    >
                        <List.Item.Meta title={<a href={"/article/detail/" + item.id} target='_blank'>{item.title}</a>}/>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }}>{item.abstractContent}</Paragraph>
                    </List.Item>
                )}
            />
        </div>
    }
}


export default CollectionDetail;