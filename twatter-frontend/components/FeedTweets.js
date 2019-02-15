import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import UserTweet from "./Tweet";

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

const Feed = styled.div`
  max-height: calc(100vh - 170px);
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: ${props => props.theme.lightgrey3};
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: ${props => props.theme.lightgrey3};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.blue};
  }
`;

const FeedTweets = props => (
  <Query
    // fetchPolicy="network-only"
    query={ALL_TWEETS_QUERY}
  >
    {({ data, error, loading }) => (
      <Feed>
        {data.tweets.map((tweet, i) => (
          <UserTweet
            currentUser={props.currentUser}
            key={`tweet-${i}`}
            tweet={tweet}
          />
        ))}
      </Feed>
    )}
  </Query>
);
export default FeedTweets;
export { ALL_TWEETS_QUERY };
