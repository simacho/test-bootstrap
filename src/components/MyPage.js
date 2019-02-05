import React, { Component } from 'react';
// import './MyPage.css';
import { Button , Alert , Badge , Form } from 'react-bootstrap';

export class MyPage extends Component {
    render() {
        return (
            <div>
                <Button variant="flag" size="xxl">
                    flagbutton
                </Button>
                <Alert variant="primary">
                    This is a hoge alert
                </Alert>
                <Button variant="primary">
                    Profile <Badge variant="light">9</Badge>
                    <span className="sr-only">unread messages</span>
                </Button>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Eメールアドレス</Form.Label>
                        <Form.Control type="email" placeholder="Eメールアドレスを入力してください" onChange={this.props.onTextChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control type="password" placeholder="パスワード" />
                    </Form.Group>
                   <Form.Group controlId="formDisplayName">
                        <Form.Label>表示名称</Form.Label>
                        <Form.Control type="text" placeholder="表示名" />
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                     <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

