import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Avatar, Icon, Button } from "antd";

const ALL_TWEETS_QUERY = gql`
  query ALL_TWEETS_QUERY {
    tweets(orderBy: createdAt_DESC) {
      id
      message
      updatedAt
      image
      largeImage
      user {
        displayImg
        name
        handle
        email
      }
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

const Feed = styled.div`
  max-height: calc(100vh - 170px);
  overflow-y: auto;
`;

const FeedTweets = () => (
  <Query
    // fetchPolicy="network-only"
    query={ALL_TWEETS_QUERY}
  >
    {({ data, error, loading }) => (
      <Feed>
        {data.tweets.map((tweet, i) => (
          <TweetContainer key={`tweet-${i}`}>
            {console.log(data)}
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
                <Button
                  style={{
                    justifySelf: "end",
                    border: "none",
                    boxShadow: "none"
                  }}
                  shape="circle"
                  icon="down"
                />
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
        ))}
      </Feed>
    )}
  </Query>
);
export default FeedTweets;
export { ALL_TWEETS_QUERY };
