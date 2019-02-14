import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Icon, Input, Avatar, Badge, Button } from "antd";
import User from "./User";
import UserDropdown from "./UserDropdown";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const HeaderContainer = styled.div`
  height: 53px;
  background-color: ${props => props.theme.white};
`;

const HeaderInside = styled.div`
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 90px 90px 90px 90px 1fr auto auto;
  grid-gap: 10px;
  align-items: center;
`;

const HeaderButton = styled.div`
  width: 90px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${props => (props.selected ? "2px solid #1DA1F2" : "none")};
`;

const Header = () => (
  <User>
    {({ data: { me } }) => (
      <HeaderContainer>
        <HeaderInside>
          <HeaderButton selected>
            <Icon
              style={{ color: "#657786", fontSize: 24 }}
              type="home"
              theme="twoTone"
            />
          </HeaderButton>
          <HeaderButton>
            <Icon style={{ color: "#657786", fontSize: 24 }} type="search" />
          </HeaderButton>
          <HeaderButton>
            <Icon style={{ color: "#657786", fontSize: 24 }} type="bell" />
          </HeaderButton>
          <HeaderButton>
            <Icon style={{ color: "#657786", fontSize: 24 }} type="mail" />
          </HeaderButton>
          <Input
            placeholder="Search"
            prefix={<Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <div className="profile">
            {!me ? (
              <UserDropdown />
            ) : (
              <Mutation
                mutation={SIGN_OUT_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              >
                {signout => (
                  <>
                    <Badge dot>
                      <Avatar shape="square" src={me.displayImg} />
                    </Badge>
                    <Button
                      style={{ marginLeft: "1rem" }}
                      type="dashed"
                      onClick={() => signout()}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Mutation>
            )}
          </div>
        </HeaderInside>
      </HeaderContainer>
    )}
  </User>
);

export default Header;
