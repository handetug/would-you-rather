import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'react-sweet-progress';

class Result extends Component {
	render() {
      const { question, author, answer } = this.props;

	  
      //calculate the logic 
      const optionOneCount = question.optionOne.votes.length;
      const optionTwoCount = question.optionTwo.votes.length;
      const totalCount = optionOneCount + optionTwoCount;
      const optionOnePercentage = Math.round(( optionOneCount / totalCount ) * 100);
      const optionTwoPercentage = Math.round(( optionTwoCount / totalCount ) * 100);
      
    	return(
        	<div className='home-container center'>
          		<div className='bg-header question-poll-header'>
          			Asked by {author.name}
          		</div>
				<hr className='hr-home-color' />
				<div className='in-block-left'>
					<img
						alt={author.id}
						src={author.avatarURL}
						className='question-author-img center result-author-img'
					/>
				</div>
				<div className='in-block-right'>
					<h2 className='question-header mb-15'>Results:</h2>
					<div className={answer === 'optionOne' 
                                        	? 'result-block bg-header result-selected-block' 
                                        	: 'result-block bg-header' } >

						{answer === 'optionOne' && <div className='result-choice center'>Your vote</div>}
						<span className='fs-15'>Would you rather {question.optionOne.text}?</span>
				
						<Progress percent={optionOnePercentage} className='mt-10'
							theme={{
                            success: {
                              symbol: optionOnePercentage + '%',
                              color: '#58D99B'
                            },
                            active: {
                              color: '#58D99B',
                              trailColor: '#B7B9B8'
                            },
							default: {
                              symbol: optionOnePercentage + '%',
                              trailColor: '#B7B9B8'
                            }
                          }}
                        />
						<div className='result-total-votes'>{optionOneCount} out of {totalCount} votes</div>
					</div>
					<div className={answer === 'optionTwo' 
                                        	? 'result-block bg-header result-selected-block' 
                                        	: 'result-block bg-header' } >

						{answer === 'optionTwo' && <div className='result-choice center'>Your vote</div>}
						<span className='fs-15'>Would you rather {question.optionTwo.text}?</span>
						<br />
						<Progress percent={optionTwoPercentage} className='mt-10'
							theme={{
                            success: {
                              symbol: optionTwoPercentage + '%',
                              color: '#58D99B'
                            },
                            active: {
                              color: '#58D99B',
                              trailColor: '#B7B9B8'
                            },
							default: {
                              symbol: optionTwoPercentage + '%',
                              trailColor: '#B7B9B8'
                            }
                          }}
                        />
						<div className='result-total-votes'>{optionTwoCount} out of {totalCount} votes</div>
					</div>
				</div>
          	</div>
        )
    }
}

function mapStateToProps ({ questions, users, authedUser}, { id }) {
	return {
    	question: questions[id],
      	author: users[questions[id].author],
        answer: users[authedUser].answers[id]
        
    }
}

export default connect(mapStateToProps)(Result);