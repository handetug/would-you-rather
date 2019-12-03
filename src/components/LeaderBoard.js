import React, { Component } from "react";
import { connect } from "react-redux";
import LeaderBoardItem from "./LeaderBoardItem";
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.css'


class LeaderBoard extends Component {
  render() {
    const { sortedUsers , loginControl} = this.props;
    
    //first user not null control
    if (!loginControl) { 
			return <Login/>
		}

    const users = sortedUsers.map(id => {
      return <LeaderBoardItem userId={id} key={id} />;
    });

    return (
      <div style={{ width: "100%" }}>
        <ul>{users}</ul>
      </div>
    );
  }
}

//sort the users
function mapStateToProps({ users, authedUser }) {
  let sortedUsers = Object.keys(users).sort((a, b) => {
    return (
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
    );
  });
  return {
    sortedUsers,
    loginControl: authedUser !== null
  };
}

export default connect(mapStateToProps)(LeaderBoard);