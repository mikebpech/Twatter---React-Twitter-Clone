import { Query } from "react-apollo";
import gql from "graphql-tag";
import propTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      displayImg
      handle
      tweets {
        id
        message
      }
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: propTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
