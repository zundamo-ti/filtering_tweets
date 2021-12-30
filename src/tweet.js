import React from "react";
import styled from "@emotion/styled";
import moment from "moment";

const TextContainer = styled.div({
  marginTop: "10px"
});

const UserContainer = styled.b({
  display: "inline-flex"
});

const StatusContainer = styled.div({
  textAlign: "end"
});

const TweetContainer = styled.div({
  backgroundColor: "lightgray",
  width: "80%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
});

const Tweet = ({ tweet }) => {
  const {
    id,
    text,
    createdAt,
    user: {
      name,
      username
    }
  } = tweet

  return (
    <TweetContainer>
      <UserContainer>
        {name} (@{username})
      </UserContainer>
      <hr />
      <TextContainer>
        {text}
        <br />
      </TextContainer>
      <hr />
      <StatusContainer>
        <a
          style={{ "paddingInline": "10px" }}
          href={`https://twitter.com/TwitterJP/status/${id}`}
          target='_blank'
          rel="noreferrer">
          original
        </a>
        {moment(createdAt).format(
          'yyyy-MM-DD HH:MM:ss'
        )}
      </StatusContainer>
    </TweetContainer>
  )
}

export default Tweet;
