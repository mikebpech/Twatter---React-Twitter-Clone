import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Icon, Avatar, Input, Button, message } from "antd";
import { ALL_TWEETS_QUERY } from "./FeedTweets";

const CREATE_TWEET_MUTATION = gql`
  mutation CREATE_TWEET_MUTATION($message: String!, $largeImage: String) {
    createTweet(message: $message, largeImage: $largeImage) {
      id
      message
      user {
        handle
      }
    }
  }
`;

const TweetContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-gap: 8px;

  .footer {
    display: grid;
    grid-template-columns: 50px 50px 50px 1fr;
    grid-gap: 10px;
    align-items: center;
    margin-top: 2.5rem;
  }
`;

class CreateTweet extends Component {
  state = { message: "" };

  handleCreateTweet = async (e, createTweet) => {
    e.preventDefault();
    this.setState({ message: "" });
    this.props.toggleCreateTweet();
    const res = await createTweet().catch(err =>
      message.error("Something went wrong!")
    );
    message.success("Tweeted successfully!");
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_TWEET_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: ALL_TWEETS_QUERY }]}
      >
        {(createTweet, { loading, error }) => {
          if (error) {
            message.error(error.message);
          }
          return (
            <TweetContainer>
              <Avatar icon="user" />
              <div className="right">
                <Input.TextArea
                  value={this.state.message}
                  onChange={e => this.setState({ message: e.target.value })}
                  placeholder="What's happening?"
                  style={{ fontSize: 20, borderBottom: "2px solid #1DA1F2" }}
                  rows={4}
                  autosize={{ minRows: 4, maxRows: 6 }}
                />
                <div className="footer">
                  <Icon
                    type="picture"
                    style={{ color: "#1DA1F2", fontSize: 24 }}
                  />
                  <Icon
                    style={{ fontSize: 24, color: "#1DA1F2" }}
                    type="environment"
                  />
                  <Icon
                    style={{ fontSize: 24, color: "#1DA1F2" }}
                    type="bar-chart"
                  />
                  <Button
                    type="primary"
                    onClick={e => this.handleCreateTweet(e, createTweet)}
                    style={{ justifySelf: "end" }}
                  >
                    Tweet
                  </Button>
                </div>
              </div>
            </TweetContainer>
          );
        }}
      </Mutation>
    );
  }
}

export default CreateTweet;
