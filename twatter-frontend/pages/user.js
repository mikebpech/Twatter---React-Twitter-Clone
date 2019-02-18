import React, { Component } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { HomeContainer } from "./index";
import SidebarFeed from "../components/SidebarFeed";
import { Button, Icon } from "antd";
import UserTweets from "../components/UserTweets";
import FollowButton from "../components/FollowButton";

const USER_QUERY = gql`
  query USER_QUERY($handle: String!) {
    user(where: { handle: $handle }) {
      id
      name
      handle
      displayImg
      coverImg
      followers
      following
      verified
      bio
      tweets {
        message
        image
        createdAt
      }
    }
  }
`;

const Profile = styled.div`
  background: ${props => props.theme.white};
  grid-row: span 2;

  .images {
    img {
      background-size: cover;
      position: relative;
      object-fit: cover;
    }
    .displayImg {
      object-fit: contain;
      width: 150px;
      height: 150px;
      position: absolute;
      border: 3px solid ${props => props.theme.white};
      top: 50px;
      left: 25px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 150px;
        width: 150px;
        background-color: ${props => props.theme.darkgrey};
      }
    }
  }
`;

const UserActions = styled.div`
  display: grid;
  grid-template-columns: 60px 60px auto;
  justify-content: end;
  align-items: center;
  padding: 1rem;
`;

const UserDetails = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.lightgrey2};
  h3 {
    font-weight: 700;
    margin: 0;
    font-size: 2rem;
  }
  h4 {
    margin-top: 0.5rem;
    color: ${props => props.theme.darkgrey};
  }
  p {
    margin-top: 1.5rem;
    font-size: 1.7rem;
  }

  .information {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    color: ${props => props.theme.lightgrey};

    .follow {
      color: ${props => props.theme.black};
      margin-right: 1rem;
      span {
        margin-right: 0.2rem;
        font-weight: 700;
      }
    }

    svg {
      margin-right: 0.5rem;
    }

    span {
      margin-right: 1rem;
    }
  }
`;

class UserProfile extends Component {
  static async getInitialProps({ query }) {
    return {};
  }
  render() {
    const { user } = this.props.query;
    const { me } = this.props;
    return (
      <Query query={USER_QUERY} variables={{ handle: user }}>
        {({ data, loading, error }) => {
          const { user } = data;
          return (
            <HomeContainer>
              <Profile>
                <div className="images">
                  <img
                    style={{ width: "600px", height: "150px" }}
                    src={
                      user.coverImg ||
                      "https://source.unsplash.com/random/600x150"
                    }
                    alt="COVER IMG"
                  />
                  <div className="displayImg">
                    <img
                      src={user.displayImg || "https://placehold.it/200/200"}
                      alt="User Display Img"
                    />
                  </div>
                </div>
                <UserActions>
                  <Button
                    style={{ color: "#1890fe", border: "1px solid #1890fe" }}
                    size="large"
                    shape="circle"
                    icon="setting"
                  />
                  <Button
                    style={{ color: "#1890fe", border: "1px solid #1890fe" }}
                    size="large"
                    shape="circle"
                    icon="bell"
                  />
                  <FollowButton me={me} user={user} />
                </UserActions>
                <UserDetails>
                  <h3>{user.name}</h3>
                  <h4>@{user.handle}</h4>
                  <p>{user.bio || "No bio has been set..."}</p>
                  <div className="information">
                    <div className="follow">
                      <span>{user.followers.length}</span> follower
                      {user.followers.length === 1 ? "" : "s"}
                    </div>
                    <div className="follow">
                      <span>{user.following.length}</span> following
                    </div>
                    <Icon type="environment" />
                    <span>Montreal, QC</span>
                    <Icon type="calendar" />
                    Joined{" "}
                    {user.createdAt
                      ? format(user.createdAt, "MMMM YYYY")
                      : "January 2019"}
                  </div>
                </UserDetails>
                <UserTweets handle={user.handle} />
              </Profile>
              <SidebarFeed me={me} />
            </HomeContainer>
          );
        }}
      </Query>
    );
  }
}

export default UserProfile;
