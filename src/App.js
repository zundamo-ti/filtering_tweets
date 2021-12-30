import React, { Fragment } from "react";
import TimelinePage from "./timeline_page";

class App extends React.Component {
  state = {
    username: null,
    showTimeline: false,
    regexp: ''
  }

  changeUsername = (event) => {
    this.setState({
      username: event.target.value,
      showTimeline: false
    })
  }

  changeRegExp = (event) => {
    this.setState({
      regexp: event.target.value,
      showTimeline: false
    })
  }

  showTimeline = () => {
    this.setState({
      showTimeline: !this.state.showTimeline
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          <label>user name</label>
          <input type='text' onChange={this.changeUsername}/>
        </div>
        <div>
          <label>regexp</label>
          <input type='text' onChange={this.changeRegExp}/>
        </div>
        <button onClick={this.showTimeline}>search</button>
        <hr />
        {
          this.state.showTimeline &&
          <TimelinePage
            key={this.state.username}
            regexp={this.state.regexp}
            username={this.state.username} />
        }
      </Fragment>
    )
  }
}

export default App;
