import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { InitialData } from './actions/shared';
import  ErrorPage  from './components/ErrorPage';
import LoadingBar from 'react-redux-loading';
import Login from './components/Login';
import NewQuestion from './components/Newquestion';
import Navigation from './components/Navigation';
import LeaderBoard from './components/LeaderBoard';
import QuestionPoll from './components/QuestionPoll';

class App extends Component {
	componentDidMount() {
		this.props.dispatch(InitialData());

}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className='Nav-container'>
						<Navigation />
					</div>
					<hr className='hr-app-color' />
					<div className='container'>
						<div>
							<Switch>
								<Route path='/' exact component={Login} />
								<Route path='/add' exact component={NewQuestion} />
								<Route path="/leaderBoard" exact component={LeaderBoard} />
								<Route path="/questions/:id" component={QuestionPoll} />
								<Route component={ErrorPage} />  {/* -->if not found any page */}
							</Switch>
						</div>
					</div>
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps({ authedUser }) {
	return {
	  loginControl: authedUser !== null //for login control on other pages.
	};
  }
  
export default connect(mapStateToProps)(App);