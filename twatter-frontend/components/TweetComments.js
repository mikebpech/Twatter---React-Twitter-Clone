import React, { Component } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const TweetComment = styled.div`
  grid-column: span 2;
  padding: 1rem;

  button {
    margin-top: 1rem;
  }
`;

class TweetComments extends Component {
  state = {
    comment: ""
  };
  render() {
    const handleChange = e => {
      this.setState({
        name: e.target.value
      });
    };

    return (
      <TweetComment>
        <Input.TextArea
          placeholder="Leave a comment..."
          rows={3}
          onChange={e => handleChange(e)}
          value={this.state.comment}
        />
        <Button type="primary">Submit</Button>
      </TweetComment>
    );
  }
}

export default TweetComments;
