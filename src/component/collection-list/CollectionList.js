import React, {Component} from 'react';
import {List, Typography} from 'antd';
import BookApi from "../../server/BookApi";

const { Paragraph } = Typography;

class CollectionList extends Component {
    constructor(props){
        super(props);
        this.state={
            collection: [],
            total: 0
        };
        this.loadCollectionList(1, "");
    }

    loadCollectionList(page, key){
        BookApi.getCollection(page, key)
            .then((data) => {
                this.setState({
                    collection: data.items,
                    total: data.total
                });
            })
            .catch(()=>{})
    }

    render(){
        return <div style={{ width: '1000px', marginLeft: 'auto', marginRight:'auto', marginTop: 0, marginBottom: 50, background: '#ffffff' }}>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        this.loadCollectionList(page, "");
                    },
                    pageSize: 10,
                    total: this.state.total
                }}
                bordered
                dataSource={this.state.collection}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={
                            <img
                                width={272}
                                alt={item.name}
                                src={item.picture}
                            />
                        }
                    >
                        <List.Item.Meta title={<a href={"/collection/detail/" + item.id} target='_blank'>{item.name}</a>}/>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }}>{item.description}</Paragraph>
                    </List.Item>
                )}
            />
        </div>
    }
}


export default CollectionList;