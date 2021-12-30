import React, { Fragment, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Tweet from './tweet';

export const GET_TIMELINE = gql`
  query GetTimelineByUsername($username: String, $token: String) {
    getTimelineByUsername(username: $username, token: $token) {
      tweets {
        id
        createdAt
        text
        source
        tweetMetrics {
          retweetCount
          replyCount
          likeCount
          quoteCount
        }
        user {
          id
          createdAt
          name
          username
        }
      }
      prevToken
      nextToken
    }
  }
`;

const TimelinePage = ({ username, regexp }) => {
  const [reverse, setReverse] = useState(false)
  const [tweets, setTweets] = useState([])
  const [token, setToken] = useState(null)
  const { error, fetchMore } = useQuery(
    GET_TIMELINE, {
    variables: {
      username,
      token
    }
  })

  if (!username) {
    return (
      <div>Put user name</div>
    )
  }

  let element;
  if (error) element = <div>{`Error! ${error}`}</div>
  else {
    let displayTweets = tweets.filter(
      tweet => regexp.test(tweet.text)
    ).map(tweet => {
        return <Tweet key={tweet.id} tweet={tweet}/>
    })
    if (reverse) displayTweets = displayTweets.reverse()
    element = (
      <ul>{displayTweets}</ul>
    )
  }

  const loadMore = async () => {
    await fetchMore({
      variables: {
        username,
        token: token
      }
    })
    .then(({ data }) => {
      setToken(data.getTimelineByUsername.nextToken)
      setTweets([...tweets, ...data.getTimelineByUsername.tweets])
    })
  }

  return (
    <Fragment>
      From the latest {tweets.length} tweets
      <br />
      <button
        onClick={loadMore}>
        load more
      </button>
      <button
        onClick={() => {setReverse(!reverse)}}>
        reverse order
      </button>
      {element}
    </Fragment>
  )
}

export default TimelinePage;
