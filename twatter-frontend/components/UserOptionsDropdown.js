import React, { Component } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Dropdown, Icon, Menu, Drawer, Avatar } from "antd";

const AccountInfo = styled.div`
  h3 {
    font-weight: 700;
    margin: 0;
    margin-top: 1rem;
  }

  h4 {
    color: ${props => props.theme.darkgrey};
  }

  .stats {
    display: flex;

    .stat {
      display: flex;
      align-items: center;
      font-weight: 700;
      span {
        margin-left: 0.5rem;
        font-weight: 500;
      }

      &:not(:last-child) {
        margin-right: 1.2rem;
      }
    }
  }
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.lightgrey2};
`;

const Options = styled.div`
  display: grid;
  grid-template-rows: 50px 50px 50px 50px 50px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  font-size: 1.5rem;
`;

class UserOptionsDropdown extends Component {
  state = {
    drawerOpen: false
  };

  toggleDrawer = () => {
    this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
  };

  render() {
    const UserMenu = () => (
      <Menu>
        <Menu.Item onClick={() => this.toggleDrawer()} key="0">
          <Icon type="user" />
          Profile
        </Menu.Item>
        <Menu.Item onClick={() => this.toggleDrawer()} key="1">
          <Icon type="tool" />
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">Cancel</Menu.Item>
      </Menu>
    );

    return (
      <>
        <Drawer
          title="Account Info"
          placement="right"
          closable={true}
          onClose={this.toggleDrawer}
          visible={this.state.drawerOpen}
        >
          <AccountInfo>
            <Avatar src={this.props.me.displayImg} size="large" />
            <h3>{this.props.me.name}</h3>
            <h4>@{this.props.me.handle}</h4>
            <div className="stats">
              <div className="stat">
                {this.props.me.following.length} <span>following</span>
              </div>
              <div className="stat">
                {this.props.me.followers.length}{" "}
                <span>
                  follower{this.props.me.followers.length === 0 ? "" : "s"}
                </span>
              </div>
            </div>
          </AccountInfo>
          <Options>
            <Option>
              <Link
                href={`/user?user=${this.props.me.handle}`}
                as={`/user/${this.props.me.handle}`}
              >
                <a onClick={() => this.toggleDrawer()}>
                  <Icon style={{ marginRight: ".8rem" }} type="user" />
                  Profile
                </a>
              </Link>
            </Option>
            <Option>
              <Icon style={{ marginRight: ".8rem" }} type="form" />
              Lists
            </Option>
            <Option>
              <Icon style={{ marginRight: ".8rem" }} type="book" />
              Bookmarks
            </Option>
            <Option>
              <Icon style={{ marginRight: ".8rem" }} type="thunderbolt" />
              Moments
            </Option>
            <a href="https://github.com/mikebpech">
              <Option>
                <Icon style={{ marginRight: ".8rem" }} type="github" />
                Created by mikebpech{" "}
                <Icon
                  type="heart"
                  theme="filled"
                  style={{ marginLeft: "0.3rem", color: "firebrick" }}
                />
              </Option>
            </a>
          </Options>
        </Drawer>
        <Dropdown overlay={UserMenu}>
          <Avatar
            style={{ cursor: "pointer" }}
            shape="square"
            src={this.props.me.displayImg}
          />
        </Dropdown>
      </>
    );
  }
}

export default UserOptionsDropdown;
