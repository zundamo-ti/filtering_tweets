import React, { Fragment } from "react";
import TimelinePage from "./timeline_page_2";

const fromQueryToRegExp = (query) => {
  return new RegExp(query)
}

class App extends React.Component {
  state = {
    username: null,
    query: ''
  }

  changeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  changeQuery = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          <label>user name: @</label>
          <input type='text' onChange={this.changeUsername}/>
        </div>
        <div>
          <label>query: </label>
          <input type='text' onChange={this.changeQuery}/>
        </div>
        <hr />
        <TimelinePage
          key={this.state.username}
          regexp={fromQueryToRegExp(this.state.query)}
          username={this.state.username} />
      </Fragment>
    )
  }
}

export default App;
