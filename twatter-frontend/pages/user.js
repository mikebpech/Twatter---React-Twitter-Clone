import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { HomeContainer } from "./index";
import SidebarFeed from "../components/SidebarFeed";
import { Button } from "antd";

const USER_QUERY = gql`
  query USER_QUERY($handle: String!) {
    user(where: { handle: $handle }) {
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
  display: grid;
  grid-row: span 2;
  grid-template-rows: 150px auto 1fr;

  .images {
    img {
      background-size: cover;
      position: relative;
    }
    .displayImg {
      width: 150px;
      height: 150px;
      position: absolute;
      border: 3px solid ${props => props.theme.white};
      top: 50px;
      left: 25px;
      border-radius: 50%;
      overflow: hidden;
      img {
        object-fit: cover;
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
  h3 {
    font-weight: 700;
    margin: 0;
    font-size: 2rem;
  }
  h4 {
    margin-top: 0.5rem;
    color: ${props => props.theme.darkgrey};
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
                {console.log(me)}
                <div className="images">
                  <img
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
                    icon="tool"
                  />
                  <Button
                    style={{ color: "#1890fe", border: "1px solid #1890fe" }}
                    size="large"
                    shape="circle"
                    icon="bell"
                  />
                  {me && me.following.includes(user.handle) ? (
                    <Button type="danger" size="large">
                      Following
                    </Button>
                  ) : (
                    <Button type="primary" size="large">
                      Follow
                    </Button>
                  )}
                </UserActions>
                <UserDetails>
                  <h3>{user.name}</h3>
                  <h4>@{user.handle}</h4>
                </UserDetails>
              </Profile>
              <SidebarFeed />
            </HomeContainer>
          );
        }}
      </Query>
    );
  }
}

export default UserProfile;
