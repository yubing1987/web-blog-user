import React, {Component} from 'react';
import {List, Typography} from 'antd';
import BookApi from "../../server/BookApi";

const { Paragraph } = Typography;

class BookList extends Component {
    constructor(props){
        super(props);
        this.state={
            books: [],
            total: 0
        };
        this.loadBookList(1, "");
    }

    loadBookList(page, key){
        BookApi.getBooks(page, key)
            .then((data) => {
                this.setState({
                    books: data.items,
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
                        this.loadBookList(page, "");
                    },
                    pageSize: 10,
                    total: this.state.total
                }}
                bordered
                dataSource={this.state.books}
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
                        <List.Item.Meta title={<a href={"/book/detail/" + item.id + "/0"} target='_blank'>{item.name}</a>}/>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }}>{item.description}</Paragraph>
                    </List.Item>
                )}
            />
        </div>
    }
}


export default BookList;