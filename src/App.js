import React, { Fragment } from "react";
import TimelinePage from "./timeline_page";

class App extends React.Component {
  state = {
    userId: null,
    showTimeline: false
  }

  changeUserId = (event) => {
    this.setState({
      userId: event.target.value
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
          <label>user id</label>
          <input type='text' onChange={this.changeUserId}/>
          <button onClick={this.showTimeline}>TL</button>
        </div>
        <hr />
        {
          this.state.showTimeline &&
          <TimelinePage
            key={this.state.userId}
            userId={this.state.userId} />
        }
      </Fragment>
    )
  }
}

export default App;
