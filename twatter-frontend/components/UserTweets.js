import gql from "graphql-tag";
import styled from "styled-components";
import { Query } from "react-apollo";
import UserTweet from "./Tweet";

const GET_USER_TWEETS_QUERY = gql`
  query GET_USER_TWEETS_QUERY($handle: String!) {
    tweets(where: { user: { handle: $handle } }) {
      message
      id
      image
      createdAt
      user {
        displayImg
        name
        handle
      }
    }
  }
`;

const Feed = styled.div`
  max-height: 270px;
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

const UserTweets = props => (
  <Query query={GET_USER_TWEETS_QUERY} variables={{ handle: props.handle }}>
    {({ data }) => (
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

export default UserTweets;
