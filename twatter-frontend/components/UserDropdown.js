import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  Dropdown,
  Button,
  Icon,
  Menu,
  Drawer,
  Form,
  Input,
  message
} from "antd";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $handle: String!
  ) {
    signup(email: $email, name: $name, password: $password, handle: $handle) {
      id
      email
      name
      handle
    }
  }
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class UserDropdown extends Component {
  state = {
    registerOpen: false,
    loginOpen: false
  };

  toggleRegisterDrawer = () => {
    if (this.state.loginOpen === false) {
      this.setState(prevState => ({ registerOpen: !prevState.registerOpen }));
    }
  };

  toggleLoginDrawer = () => {
    if (this.state.registerOpen === false) {
      this.setState(prevState => ({ loginOpen: !prevState.loginOpen }));
    }
  };

  render() {
    const UserMenu = () => (
      <Menu>
        <Menu.Item onClick={() => this.toggleLoginDrawer()} key="1">
          <Icon type="login" />
          Login
        </Menu.Item>
        <Menu.Item onClick={() => this.toggleRegisterDrawer()} key="2">
          <Icon type="user" />
          Register
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <Drawer
          title="Login"
          placement="right"
          closable={true}
          onClose={this.toggleLoginDrawer}
          visible={this.state.loginOpen}
        >
          <WrappedNormalLoginForm />
        </Drawer>
        <Drawer
          title="Register"
          placement="right"
          closable={true}
          onClose={this.toggleRegisterDrawer}
          visible={this.state.registerOpen}
        >
          <WrappedNormalRegisterForm />
        </Drawer>
        <Dropdown overlay={UserMenu}>
          <Button style={{ marginLeft: 8 }}>
            Anonymous <Icon type="down" />
          </Button>
        </Dropdown>
      </>
    );
  }
}

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        variables={this.state}
      >
        {(login, { loading, error }) => (
          <Form
            method="POST"
            onSubmit={e => {
              e.preventDefault();
              login().catch(err => message.error(err.message));
            }}
          >
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    value: this.state.email,
                    required: true,
                    message: "Please input your email!"
                  }
                ]
              })(
                <Input
                  name="email"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    value: this.state.password,
                    required: true,
                    message: "Please input your Password!"
                  }
                ]
              })(
                <Input
                  name="password"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Log in
              </Button>
              <a
                style={{ marginLeft: "1rem" }}
                className="login-form-forgot"
                href=""
              >
                Forgot password
              </a>
            </Form.Item>
          </Form>
        )}
      </Mutation>
    );
  }
}

class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    handle: "",
    password: "",
    confirmPassword: ""
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleSignup = async (e, signup) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return message.error("Password and Confirm Password don't match!");
    }
    const res = await signup().catch(err => message.error(err.message));
    console.log(res);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { loading, error }) => (
          <Form
            action="POST"
            onSubmit={e => this.handleSignup(e, signup)}
            className="login-form"
          >
            <Form.Item>
              {getFieldDecorator("fullName", {
                value: this.state.name,

                rules: [{ required: true, message: "Please input your name!" }]
              })(
                <Input
                  name="name"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Full Name"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                value: this.state.email,

                rules: [{ required: true, message: "Please input your email!" }]
              })(
                <Input
                  name="email"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  {
                    value: this.state.handle,
                    required: true,
                    message: "Please input your username!"
                  }
                ]
              })(
                <Input
                  name="handle"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                value: this.state.password,
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  name="password"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("confirmPassword", {
                value: this.state.confirmPassword,
                rules: [
                  {
                    required: true,
                    message: "Please input your Confirm Password!"
                  }
                ]
              })(
                <Input
                  name="confirmPassword"
                  onChange={this.handleChange}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Confirm Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      </Mutation>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);
const WrappedNormalRegisterForm = Form.create({ name: "normal_login" })(
  RegisterForm
);

export default UserDropdown;
