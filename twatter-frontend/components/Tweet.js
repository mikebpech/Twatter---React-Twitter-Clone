import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Avatar, Button, Dropdown, Menu, message } from "antd";
import { ALL_TWEETS_QUERY } from "./FeedTweets";

const DELETE_TWEET_MUTATION = gql`
  mutation DELETE_TWEET_MUTATION($id: ID!) {
    deleteTweet(id: $id) {
      id
      message
    }
  }
`;

const TweetContainer = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 5px;
  padding: 1.2rem;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.lightgrey2};
`;

const Tweet = styled.div`
  .tweet-header {
    display: grid;
    grid-template-columns: auto auto 1fr;
    align-items: center;
    h4 {
      font-weight: 700;
      margin: 0;
      margin-right: 0.7rem;
    }
    .handle {
      font-size: 16px;
      text-transform: lowercase;
      color: ${props => props.theme.lightgrey};
    }
  }
`;

const TweetActions = styled.div`
  display: grid;
  grid-gap: 55px;
  grid-template-columns: repeat(4, 30px);
  margin-top: 0.5rem;
`;

const UserTweet = props => {
  const { tweet, currentUser } = props;

  const TweetOptions = creator => {
    return creator.handle === currentUser.handle ? (
      <Mutation
        mutation={DELETE_TWEET_MUTATION}
        variables={{ id: tweet.id }}
        refetchQueries={[{ query: ALL_TWEETS_QUERY }]}
      >
        {deleteTweet => {
          return (
            <Menu>
              <Menu.Item
                onClick={() => {
                  deleteTweet()
                    .then(res => message.success("Deleted tweet successfully!"))
                    .catch(err => message.error(err.message));
                }}
                key="0"
              >
                Delete Tweet
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="2">Cancel</Menu.Item>
            </Menu>
          );
        }}
      </Mutation>
    ) : (
      <Menu>
        <Menu.Item key="0">Mute @{creator.handle}</Menu.Item>
        <Menu.Item key="1">Block @{creator.handle}</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">Cancel</Menu.Item>
      </Menu>
    );
  };

  return (
    <TweetContainer key={`tweet-${tweet.id}`}>
      <Avatar
        style={{
          justifySelf: "center",
          alignSelf: "start",
          marginTop: "1rem"
        }}
        src={tweet.user.displayImg}
        size="large"
      />
      <Tweet>
        <div className="tweet-header">
          <h4>{tweet.user.name}</h4>
          <div className="handle">@{tweet.user.handle}</div>
          {currentUser && (
            <Dropdown trigger={["click"]} overlay={TweetOptions(tweet.user)}>
              <a
                style={{ justifySelf: "end" }}
                className="ant-dropdown-link"
                href="#"
              >
                <Button
                  size="large"
                  style={{
                    border: "none",
                    boxShadow: "none"
                  }}
                  shape="circle"
                  icon="down"
                />
              </a>
            </Dropdown>
          )}
        </div>
        <div className="tweet-body">
          <p>{tweet.message}</p>
        </div>
        <TweetActions>
          <Button
            size="large"
            style={{
              justifySelf: "end",
              border: "none",
              boxShadow: "none"
            }}
            shape="circle"
            icon="message"
          />
          <Button
            size="large"
            style={{
              justifySelf: "end",
              border: "none",
              boxShadow: "none"
            }}
            shape="circle"
            icon="retweet"
          />
          <Button
            size="large"
            style={{
              justifySelf: "end",
              border: "none",
              boxShadow: "none"
            }}
            shape="circle"
            icon="heart"
          />
          <Button
            size="large"
            style={{
              justifySelf: "end",
              border: "none",
              boxShadow: "none"
            }}
            shape="circle"
            icon="upload"
          />
        </TweetActions>
      </Tweet>
    </TweetContainer>
  );
};

export default UserTweet;
