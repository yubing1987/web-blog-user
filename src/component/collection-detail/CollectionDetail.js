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
        return <div style={{ marginLeft: '200px', marginRight:'200px', minWidth: 500, marginTop: 0, marginBottom: 50, background: '#ffffff', boxShadow:'2px 2px 30px #ccc' }}>
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
                                style={{maxHeight: 150}}
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