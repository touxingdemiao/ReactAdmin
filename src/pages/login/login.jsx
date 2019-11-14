/*
* name:xinxin.wei
* date:2019-9-20
*
 */
/*
在这页面里要实现的功能：
* 1.收集表单里面写入的值
*2.对收集好的值进行表单验证
*在这个页面里知道的知识点：
1.高阶函数
  1).是一类特别的函数
  a.接收函数类型的参数
  b.返回的值是函数
  2）.常见
  a.定时器 setTimeout() / setInterval()
  b.promise: Promise(()=>{}) then(value =>{} ,reason =>{})
  c.数组遍历相关的方法：map()/filter()/forEach()/reduce()/find()/findIndex()
  d.函数对象的bind()
  3).高阶函数更新状态，更加具有扩展性
2.高阶组件
    1）.本质就是一个函数
    2）.接收一个组件（被包装组件），返回一个新的组件（包装组件），包装组件会向被包装组件里面传递特定属性
    3）.作用：扩展组件的功能
    4）.高阶组件也是高阶函数，他接收一个组件函数，并返回一个新的组件函数。
 */
import React, { Component } from "react";
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import logo from './images/logo.png'
class Login extends Component {
    handleSubmit = (event) => {
        //阻止默认事件(提交表单事件）
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('校验成功', values);
            }
        });
        // 获取from
        // const  form = this.props.form;
        //获取表单数据
        //  const values = form.getFieldsValue();
        //  console.log('handleSubmit()',values)
    };
    //用来possword自定义验证
    validatePwd = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码！')
        } else if (value.length < 4) {
            callback('密码的长度不能小于4位')
        } else if (value.length > 12) {
            callback('密码的长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test('value')) {
            callback('密码必须包括字母,数字,下划线等')
        } else {
            callback() //验证通过
        }
    };
    render() {
        // 获取到强大功能的from属性
        const form = this.props.form;
        const { getFieldDecorator } = form;
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>React项目：后台管理项目</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {//配置对象：属性名是特定的一些名称
                                    initialValue: 'admin',//指定初始值
                                    //声明式验证：用别人写好的验证规则进行验证
                                    rules: [
                                        { required: true, message: '请输入用户名!' },
                                        { min: 4, message: '最少要输入4位' },
                                        { max: 12, message: '最多能输入12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '必须包含数字和字母等字符' },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        { validator: this.validatePwd }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
// creat()就是一个高阶函数，他封装了一个新组件From（Login)
// 新组件通过From传入了一个强大属性from
const WrapLogin = Form.create()(Login);
export default WrapLogin