import React, { Component } from 'react';
import { Layout, Table, Row, Col, Radio, Card, Badge, Icon } from 'antd';
import { Link } from 'react-router-dom'
import history from './history'
const { Content, Header } = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



class App extends Component {
  state = {
    user: {},
    login: '',
    tasks: [],
    view: true
  };


  componentWillMount() {
    sessionStorage.getItem('id') ? fetch('/file.json')
    .then(
      response => {
        response.text()
        .then(
          data => {
            const users = JSON.parse(data);

            const user = users.filter(
              user => {
                return (user.id === sessionStorage.getItem('id'));
              }
            );

            this.setState({
              user: user["0"],
              login: user["0"].login,
              tasks: user["0"].tasks
            })

          }
        )
      }
    )
    : history.push('/');
  }

  handleChange = (e) => {
    this.setState({
      view: e.target.value === 'table' ? true : false
    })
  }


  columns = [{
    title: 'Название',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  }, {
    title: 'Описание',
    dataIndex: 'description',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.description - b.description,
  }, {
    title: 'Статус',
    dataIndex: 'status',
    filters: [{
      text: 'В процессе',
      value: 'В процессе',
    }, {
      text: 'Закончен',
      value: 'Закончен',
    }],
    filterMultiple: false,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: 'Начало',
    dataIndex: 'startDate',
    defaultSortOrder: 'descend'
  },
  {
    title: 'Конец',
    dataIndex: 'endDate',
    filterMultiple: false
  }
];

  handleLogout = () => {
    sessionStorage.removeItem('id');
  }
  render() {
    return (<Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#ffff'}}>
        {this.state.login}
        <Link to='/'>
          <Icon type="logout" style={{ padding: '5px', fontSize: '12px'}} onClick={this.handleLogout}/>
        </Link>
      </Header>
        <Content>
          <Row>
            <Col offset={4} span={16} style={{ padding: '15px'}}> 
              <RadioGroup onChange={this.handleChange} defaultValue="a">
                <RadioButton value="table">Таблица</RadioButton>
                <RadioButton value="desk">Доска</RadioButton>
              </RadioGroup>
            </Col>
          </Row>
        
          <Row>
            <Col offset={2} span={20}>
              {this.state.view
              ? <Table columns={this.columns} dataSource={this.state.tasks} onChange={this.onChange} />
              : <Row gutter={16}> {this.state.tasks ? this.state.tasks.map(
                (task, i) => {
                  return <Col span={8} style={{ padding: '15px'}}><Card title={task.name} extra={<Badge status={task.status === 'Закончен' ? 'success' : 'processing'} />} bordered={false}>
                    <p>{`Даты: ${task.startDate}-${task.endDate}`}</p>
                    <p>{task.description}</p>
                  </Card>
                  </Col>
                }
              ) : null} </Row>}
              </Col>
          </Row>
        </Content>
    </Layout>
      
    );
  }
}

export default App;
