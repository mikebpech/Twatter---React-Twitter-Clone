import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Button, Icon, Avatar } from "antd";

const RANDOM_USERS_QUERY = gql`
  query RANDOM_USERS_QUERY($first: Int = 3) {
    users(first: $first, orderBy: createdAt_DESC) {
      handle
      id
      displayImg
      name
    }
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

  .hashtag {
    cursor: pointer;
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme.lightgrey2};
    transition: all 0.2s;
    &:hover {
      background-color: ${props => props.theme.lightgrey3};
    }

    h3 {
      font-weight: 700;
    }

    p {
      color: ${props => props.theme.darkgrey};
    }
  }

  .suggestions {
    display: grid;
    grid-template-rows: repeat(3, 1fr);

    .item {
      &:hover {
        background-color: ${props => props.theme.lightgrey3};
      }
      &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.lightgrey2};
      }
      transition: all 0.2s;
      cursor: pointer;
      align-items: center;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 50px 1fr 80px;

      h3 {
        font-size: 1.7rem;
        font-weight: 700;
      }

      h4 {
        color: ${props => props.theme.darkgrey};
      }

      h3,
      h4 {
        margin: 0;
      }
    }
  }
`;

const SidebarFeed = () => (
  <>
    <Query query={RANDOM_USERS_QUERY}>
      {({ data, error, loading }) => {
        return (
          <Sidebar>
            <div className="header">
              <h2>
                Who to follow
                <Icon
                  style={{ color: "#1DA1F2", marginLeft: ".5rem" }}
                  type="twitter"
                />
              </h2>
            </div>
            <div className="suggestions">
              {data.users &&
                data.users.map(user => (
                  <div key={user.id} className="item">
                    <Avatar size="large" src={user.displayImg} />
                    <div className="item-user">
                      <h3>{user.name}</h3>
                      <h4>@{user.handle}</h4>
                    </div>
                    <Button type="primary">Follow</Button>
                  </div>
                ))}
            </div>
          </Sidebar>
        );
      }}
    </Query>
    <Sidebar>
      <div className="header">
        <h2>
          Worldwide trends
          <Icon style={{ marginLeft: ".5rem" }} type="global" />
        </h2>
      </div>
      <div className="hashtags">
        <div className="hashtag">
          <h3>#twatter</h3>
          <p>33.5k Tweets</p>
        </div>
      </div>
    </Sidebar>
  </>
);

export default SidebarFeed;
