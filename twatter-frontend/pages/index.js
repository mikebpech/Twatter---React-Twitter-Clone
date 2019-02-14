import React, { Component } from "react";
import styled from "styled-components";
import { Avatar, Input, Icon, Modal } from "antd";
import CreateTweet from "../components/CreateTweet";
import FeedTweets from "../components/FeedTweets";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 600px 380px;
  grid-gap: 20px;
`;

const Feed = styled.div`
  background: ${props => props.theme.white};
  display: grid;
  grid-template-rows: auto 1fr;

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

const Sidebar = styled.div`
  background: ${props => props.theme.white};
  display: grid;
  height: 300px;
  grid-template-rows: auto 1fr;
  .header {
    border-bottom: 1px solid ${props => props.theme.lightgrey2};
    h2 {
      margin: 0;
      padding: 1.3rem;
      font-weight: 700;
      font-size: 20px;
    }
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
          <FeedTweets />
        </Feed>
        <Sidebar>
          <div className="header">
            <h2 onClick={() => console.log(this.props)}>
              Who to follow
              <Icon
                style={{ color: "#1DA1F2", marginLeft: ".5rem" }}
                type="twitter"
              />
            </h2>
          </div>
        </Sidebar>
      </HomeContainer>
    );
  }
}

export default Home;
