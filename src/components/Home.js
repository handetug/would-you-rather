import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './Login';

class Home extends Component {
  	state={
    	answered: false,
    }

	//set unanswer the question
	handleUnansweredQuestions = (e) => {
      	e.preventDefault();
      
    	this.setState({
          answered: false,
        });
    }

	//set answers the question
	handleAnsweredQuestions = (e) => {
        e.preventDefault();
      
    	this.setState({
          answered: true,
        });
    }

	handleViewPool = (e, id) => {
    	e.preventDefault();
      
      	this.props.history.push(`/questions/${id}`)
    }
  
	render () {
      	const { answeredQuestions, unansweredQuestions, users, authedUser } = this.props;
		const { answered } = this.state;

		let questionList = unansweredQuestions;

	
		if (authedUser === null) {
        	return <Login /> // user must be login
        }

		if (answered) {
        	questionList = answeredQuestions;
        }

    	return (
        	<div className='home-container center' >
          		<div className='home-ul'>
          			<div 
          				className={ !answered ? 'bg-header home-header-uns-li' : 'home-header-uns-li' } >
             			<button 
             				onClick={this.handleUnansweredQuestions}
							className={!answered 
                                        	? 'home-btn-questions home-uns-questions home-header-btn-active' 
                                        	: 'home-btn-questions home-uns-questions' } >
             				Unanswered Questions
             			</button>
          			</div>
             		<div 
						className={answered ? 'bg-header home-header-ans-li' : 'home-header-ans-li' } >
             			<button 
							className={answered 
                                       ? 'home-btn-questions home-ans-questions home-header-btn-active' 
                                       : 'home-btn-questions home-ans-questions' }
      						onClick={this.handleAnsweredQuestions} >
             				Answered Questions
             			</button>
          			</div>
          		</div>
				<hr className='hr-home-color' />
				<div>
					{questionList.map(question => (
                     	<div key={question.id} className='question-poll-container' >
                          <div className='bg-header question-poll-header'>
                     			{users[question.author].name} asks:
						  </div>
						  <div className='in-block-left' >
							<img 
                             	alt={users[question.author].id}
                                src={users[question.author].avatarURL} 
                                className='question-poll-img center' />
						  </div>
						  <div className='in-block-right' >
                              <span className='question-poll-header-text'>Would you rather</span>
							  <br /> <br />
							  <span className='question-poll-text'>
							   {question.optionOne.text} 
							  </span>
							  <br />
                              <button 
								className='view-pool-btn'
								onClick={(e) => this.handleViewPool(e,question.id)}
							  >
                                  View Poll
                              </button>
						  </div>
						</div>
                     ))}
				</div>
          	</div>
        );
    }
}

function mapStateToProps ({ questions, users, authedUser }) {
  	return {
      	answeredQuestions: Object.values(questions).filter(qid => qid.optionOne.votes.includes(authedUser) 
                                                           || qid.optionTwo.votes.includes(authedUser))
      													   .sort((a,b) => b.timestamp - a.timestamp),
        unansweredQuestions: Object.values(questions).filter(qid => !qid.optionOne.votes.includes(authedUser) 
                                                           && !qid.optionTwo.votes.includes(authedUser))
      													   .sort((a,b) => b.timestamp - a.timestamp),
      	users,
    	authedUser, //set user 
    }
}

export default withRouter(connect(mapStateToProps)(Home));