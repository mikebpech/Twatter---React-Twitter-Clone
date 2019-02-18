import styled from "styled-components";
import gql from "graphql-tag";
import Link from "next/link";
import { Mutation } from "react-apollo";
import { Icon, Input, Button } from "antd";
import User from "./User";
import UserDropdown from "./UserDropdown";
import UserOptionsDropdown from "./UserOptionsDropdown";
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

  button {
    box-shadow: none;
    border: none;
    margin-top: 0.5rem;

    &:hover {
      svg {
        color: ${props => props.theme.blue};
      }
    }
  }
`;

const Header = () => (
  <User>
    {({ data: { me } }) => (
      <HeaderContainer>
        <HeaderInside>
          <HeaderButton selected>
            <Link href="/">
              <Button shape="circle" size="large">
                <Icon
                  style={{ color: "#657786", fontSize: 24 }}
                  type="home"
                  theme="twoTone"
                />
              </Button>
            </Link>
          </HeaderButton>
          <HeaderButton>
            <Button shape="circle" size="large">
              <Icon style={{ color: "#657786", fontSize: 24 }} type="search" />
            </Button>
          </HeaderButton>
          <HeaderButton>
            <Button shape="circle" size="large">
              <Icon style={{ color: "#657786", fontSize: 24 }} type="bell" />
            </Button>
          </HeaderButton>
          <HeaderButton>
            <Button shape="circle" size="large">
              <Icon style={{ color: "#657786", fontSize: 24 }} type="mail" />
            </Button>
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
                    <UserOptionsDropdown me={me} />
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
