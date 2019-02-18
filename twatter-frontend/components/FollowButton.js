import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, message } from "antd";
import { CURRENT_USER_QUERY } from "./User";
import { USER_QUERY } from "../pages/user";

const FOLLOW_USER_MUTATION = gql`
  mutation FOLLOW_USER_MUTATION($id: ID!) {
    followUser(id: $id) {
      followers
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation UNFOLLOW_USER_MUTATION($id: ID!) {
    unfollowUser(id: $id) {
      followers
    }
  }
`;

const FollowButton = ({ me, user, loading1 }) => {
  const handleFollowUser = async followUser => {
    const res = await followUser()
      .then(res => message.success("Followed user successfully!"))
      .catch(err => message.error(err.message));
  };

  const handleUnfollowUser = async unfollowUser => {
    const res = await unfollowUser()
      .then(res => message.success("Unfollowed user successfully!"))
      .catch(err => message.error(err.message));
  };

  if (me && user && me.id !== user.id) {
    return me && me.following.includes(user.id) ? (
      <Mutation
        mutation={UNFOLLOW_USER_MUTATION}
        variables={{ id: user.id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(unfollowUser, { loading, error }) => (
          <Button
            loading={loading || loading1}
            onClick={() => handleUnfollowUser(unfollowUser)}
            type="danger"
            size="large"
          >
            Following
          </Button>
        )}
      </Mutation>
    ) : (
      <Mutation
        mutation={FOLLOW_USER_MUTATION}
        variables={{ id: user.id }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(followUser, { loading, error }) => (
          <Button
            loading={loading || loading1}
            onClick={() => handleFollowUser(followUser)}
            type="primary"
            size="large"
          >
            Follow
          </Button>
        )}
      </Mutation>
    );
  } else {
    return null;
  }
};

export default FollowButton;
