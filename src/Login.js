import React, { Component } from 'react';
import './Login.css';
import { Form } from 'antd';
import { Layout } from 'antd';
import LoginContainer from './LoginContainer';
import history from './history'
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;

class Login extends Component {
  state = {
    login: '',
    password: '',
    error: '',
    user: []
  };
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault();
    fetch('/file.json')
      .then(
        response => {
          response.text()
          .then(
            data => {
              const users = JSON.parse(data);

              const user = users.filter(
                user => {
                  return (user.login === this.state.login) && (user.password === this.state.password);
                }
              );
              history.push('/app')

              sessionStorage.setItem('id', user["0"].id);

            }
          )
        }
      )
    if (!this.state.login || !this.state.password) {
      this.setState({
        error: 'Нет логина или пароля'
      })
      localStorage.setItem('logged', false);
    }
    if (this.state.login && this.state.password) {
      localStorage.setItem('logged', true);
    }
  }

  render() {
    return (<Layout>
      <Content>
        <LoginContainer onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.onChange(e)} />
      </Content>
    </Layout>
      
    );
  }
}

export default Form.create()(Login);
