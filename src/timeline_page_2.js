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
      }
      prevToken
      nextToken
    }
  }
`;

const TimelinePage = ({ username, regexp }) => {
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
    element = (
      <ul>
        {
          tweets
          .filter(tweet => regexp.test(tweet.text))
          .map(tweet => {
            return (
              <Tweet key={tweet.id} tweet={tweet}/>
            )
          })
        }
      </ul>
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
      <button
        onClick={loadMore}>
        load more
      </button>
      {element}
    </Fragment>
  )
}

export default TimelinePage;
