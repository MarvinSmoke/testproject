import React, { Component } from 'react';
import './Login.css';
import { Form, Icon, Input, Button } from 'antd';
import { Row, Col } from 'antd';
const FormItem = Form.Item;


class LoginContainer extends Component {
  render() {
    return (
      <Row className='login' style={{ minHeight: '100vh' }}>
      <Col span={4} offset={10}>
      <Form onSubmit={this.props.onSubmit} className="login-form">
        <FormItem>
      <Input name='login' onChange={this.props.onChange} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          
        </FormItem>
        <FormItem>
      
        <Input name='password' onChange={this.props.onChange} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />

        </FormItem>
        <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
        Log in
      </Button>
        </FormItem>
      </Form></Col>
      </Row>
    );
  }
}

export default Form.create()(LoginContainer);
