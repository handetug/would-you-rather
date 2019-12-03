import React, { Component } from 'react';
import Question from './Question';
import Result from './Result';
import ErrorPage from './ErrorPage';
import Login from './Login';
import { connect } from 'react-redux';

class QuestionPoll extends Component {

	render() {
		const { isError, isAnswered, id, authedUser } = this.props;
       //login control
		if (authedUser === null) { 
			return <Login id={id} />
		}

		if (isError && isAnswered === null) {
			return (<ErrorPage />)
		}
		else if (isAnswered !== null) {
			return (
				<div>
					{!isAnswered
						? (<Question id={id} />)
						: (<Result id={id} />)}
				</div>
			)
		}
		else {
			return (<div>Loading...</div>)
		}
	}
}

function mapStateToProps({ questions, authedUser }, props) {
	const { id } = props.match.params;
	const question = questions[id];

	return {
		isError: Object.entries(questions).length !== 0,
		isAnswered: question
			? question.optionOne.votes.includes(authedUser) ||
			question.optionTwo.votes.includes(authedUser)
			: null,
		id,
		authedUser,
	}
}

export default connect(mapStateToProps)(QuestionPoll);