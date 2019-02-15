import React, { Component } from "react";
import styled from "styled-components";
import { Avatar, Input, Icon, Modal } from "antd";
import CreateTweet from "../components/CreateTweet";
import FeedTweets from "../components/FeedTweets";
import SidebarFeed from "../components/SidebarFeed";

const CreateTweetSticky = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${props => props.theme.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px) rotate(180deg);
  }

  &:active {
    transform: translateY(1px) rotate(180deg);
  }
`;

const HomeContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 600px 380px;
  grid-template-rows: 300px 300px;
  grid-gap: 20px;
`;

const Feed = styled.div`
  background: ${props => props.theme.white};
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row: span 2;

  .header {
    cursor: pointer;
    display: grid;
    grid-template-columns: auto 1fr 20px 20px 20px;
    grid-gap: 13px;
    padding: 2rem;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.lightgrey2};
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createTweetVisible: false
    };
  }

  toggleCreateTweet = () => {
    this.setState(prevState => ({
      createTweetVisible: !prevState.createTweetVisible
    }));
  };

  render() {
    const { createTweetVisible } = this.state;
    return (
      <HomeContainer>
        <Modal
          footer={false}
          visible={createTweetVisible}
          title={
            <Icon type="twitter" style={{ color: "#1DA1F2", fontSize: 24 }} />
          }
          onOk={() => this.toggleCreateTweet()}
          onCancel={() => this.toggleCreateTweet()}
        >
          <CreateTweet toggleCreateTweet={() => this.toggleCreateTweet()} />
        </Modal>
        <Feed>
          {this.props.me && (
            <div className="header" onClick={() => this.toggleCreateTweet()}>
              <Avatar shape="square" icon="user" />
              <Input
                style={{ cursor: "pointer" }}
                disabled
                placeholder="What's happening?"
              />
              <Icon style={{ fontSize: 20, color: "#1DA1F2" }} type="picture" />
              <Icon
                style={{ fontSize: 20, color: "#1DA1F2" }}
                type="environment"
              />
              <Icon
                style={{ fontSize: 20, color: "#1DA1F2" }}
                type="bar-chart"
              />
            </div>
          )}
          <FeedTweets currentUser={this.props.me} />
        </Feed>
        <SidebarFeed />
        <CreateTweetSticky onClick={() => this.toggleCreateTweet()}>
          <Icon type="plus" />
        </CreateTweetSticky>
      </HomeContainer>
    );
  }
}

export default Home;
