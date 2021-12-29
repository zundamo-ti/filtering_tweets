import React from "react";

const Tweet = ({ tweet }) => {
  const { id, text } = tweet

  return (
    <li>
      <a
        href={`https://twitter.com/TwitterJP/status/${id}`}
        target='_blank'
        rel='noreferrer' >
        {text}
      </a>
    </li>
    
  )
}

export default Tweet;
