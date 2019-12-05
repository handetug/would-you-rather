import React, { Component } from 'react';
import { handleAddAnswer } from '../actions/questions';
import { connect } from 'react-redux';
import Result from './Result';

class Questions extends Component {
	state = {
		answer: '',
		toResult: false,
	}

	handleChange = (e) => {
		const answer = e.target.value;

		this.setState({
			answer,
		})
	}

	//vote the poll
	handleSubmit = (e) => {
		e.preventDefault();

		const { answer } = this.state;
		const { dispatch, author,  id , authedUser} = this.props;

		dispatch(handleAddAnswer({ 
			authedUser: authedUser,
			qid: id,
			answer: answer 
		}));

		this.setState({
			answer: '',
			toResult: true,
		})
	}



	render() {
		const { question, author, id } = this.props;
		const { answer, toResult } = this.state;

		if (toResult) {
			return (<Result id={id}/>)
		}

		return (
			<div className='home-container center'>
				<div className='bg-header question-poll-header'>
					{author.name} asks:
          		</div>
				<hr className='hr-home-color' />
				<div className='in-block-left'>
					<img
						alt={author.id}
						src={author.avatarURL}
						className='question-author-img center'
					/>
				</div>
				<div className='in-block-right'>
					<h2 className='question-header'>Would You Rather ...</h2>
					<div className='question-option-block'>
						<input
							type='radio'
							name='option'
							value='optionOne'
							onChange={this.handleChange}
						/>
						<span className='question-option'>{question.optionOne.text}</span>
					</div>
					<div className='question-option-block'>
						<input
							type='radio'
							name='option'
							value='optionTwo'
							onChange={this.handleChange}
						/>
						<span className='question-option'>{question.optionTwo.text}</span>
					</div>
					<button
						type='submit'
						disabled={answer === ''}
						onClick={this.handleSubmit}
						className='question-btn'
					>
						Submit
					</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ questions, users, authedUser }, { id }) {

	return {
		question: questions[id],
		author: users[questions[id].author],
		id,
		authedUser,
		answer
	}
}

export default connect(mapStateToProps)(Questions);