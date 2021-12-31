import React, { Fragment } from "react";
import TimelinePage from "./timeline_page";

const fromQueryToRegExp = (query) => {
  return new RegExp(query)
}

class App extends React.Component {
  state = {
    username: null,
    queryString: '',
    queryRegExp: new RegExp()
  }

  changeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  changeQueryString = (event) => {
    this.setState({
      queryString: event.target.value
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
          <label>query regexp: </label>
          <input type='text' onChange={this.changeQueryString}/>
        </div>
        <button
          onClick={() => {
            this.setState({
              queryRegExp: fromQueryToRegExp(
                this.state.queryString
              )
            })
          }}>
          filtering
        </button>
        <hr />
        <TimelinePage
          key={this.state.username}
          regexp={this.state.queryRegExp}
          username={this.state.username} />
      </Fragment>
    )
  }
}

export default App;
