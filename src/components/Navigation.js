import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';


class Nav extends Component {
  handleLogOut = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
    this.props.history.push('/');
  }

  render() {
    const { user } = this.props;
   //navigation bar
      return (

        <nav className='nav ml-4'>
          <ul>
            <li>
              <NavLink style={{ color: '#1b8bb4' }} to='/' exact activeClassName='active'>
                Home
                  </NavLink>
            </li>
            {user && (
              <Fragment>
                <li>
                  <NavLink style={{ color: '#1b8bb4' }} to='/add' activeClassName='active'>
                    New Question
                  </NavLink>
                </li>
                <li>
                  <NavLink style={{ color: '#1b8bb4' }} to='/leaderboard' activeClassName='active'>
                    Leader Board
                  </NavLink>
                </li>
              </Fragment>
            )}
            {user && (
              <Fragment>
                <li className='nav-user' >
                  Hello, {user.name}
                  <img
                    src={user.avatarURL}
                    alt={user.id}
                    className='nav-user-img'
                  />
                </li>

                <li className='nav-log-out' >
                  <button
                    onClick={this.handleLogOut}
                    className='logout-btn'>
                    Logout
					      </button>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      );
    }
  }


function mapStateToProps({ users, authedUser }) {
  return {
    user: authedUser
      ? users[authedUser]
      : null,
      loginControl: authedUser !== null
  };
}

export default withRouter(connect(mapStateToProps)(Nav));