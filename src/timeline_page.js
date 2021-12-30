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
  const [token, setToken] = useState(null)
  const [page, setPage] = useState(0)
  const { loading, error, data } = useQuery(
    GET_TIMELINE, {
    variables: {
      username,
      token
    }
  })

  let element;
  if (loading) element = <div>Loading...</div>
  else if (error) element = <div>{`Error! ${error}`}</div>
  else if (!data) element = <div>Not Found</div>
  else element = (
    <ul>
      {data.getTimelineByUsername.tweets
        .filter(
          ({ text }) => (new RegExp(regexp)).test(text)
        )
        .map(
          tweet => <Tweet key={tweet.id} tweet={tweet}/>
        )
      }
    </ul>
  )

  return (
    <Fragment>
      Page {page}
      <br />
      <button
        onClick={() => {
          setToken(data.getTimelineByUsername.nextToken)
          setPage(page + 1)
        }}>
        next
      </button>
      {
        page > 0 &&
        <button
          onClick={() => {
            setToken(data.getTimelineByUsername.prevToken)
            setPage(page - 1)
          }}>
          prev
        </button>
      }
      {element}
    </Fragment>
  )
}

export default TimelinePage;
