import React, { Component } from 'react';
import Result from './Result';
import ErrorPage from './ErrorPage';
import Login from './Login';
import Selection from './Selection';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap'

class QuestionPoll extends Component {
render() {
    const { question, author, id, optionOneCount, optionTwoCount, isAnswered, userAnswer, isAuthenticated } = this.props;

    //login control
	if (isAuthenticated === null) { 
			return <Login id={id} />
		}

    if (question === undefined) {
      return (
        <div>
          <ErrorPage />
        </div>
      );
    }

    return (
      <div className="center" style={{ width: "85%" }}>
        <Container>
        <h5>{author.name + ' asks:'}</h5>
            <Row>
                <Col sm={4}>
                <img
                    src={author.avatarURL}
                    alt={`Avatar of ${author.name}`}
                    style={{ height: "150px", width: "150px", borderRadius: "50%" }}
                />
                </Col>
                <Col sm={8}>
                {isAnswered ? (
                    <Result
                    optionOneCount={optionOneCount}
                    optionTwoCount={optionTwoCount}
                    optionOne={question.optionOne.text}
                    optionTwo={question.optionTwo.text}
                    userAnswer={userAnswer}
                    />
                ) : (
                    <Selection
                    optionOne={question.optionOne.text}
                    optionTwo={question.optionTwo.text}
                    onItemSelected={this.onItemSelected}
                    id={id}
                    />
                )}
                </Col>
            </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  if (question === undefined) {
    return { question };
  }

  const author = users[question.author];
  let optionOneCount, optionTwoCount;
  let isAnswered = false;
  let userAnswer = null;
  
  if(question.optionOne.votes.includes(authedUser)) {
    userAnswer = 'optionOne'
    optionOneCount = question.optionOne.votes.length;
    optionTwoCount = question.optionTwo.votes.length;
    isAnswered = true;
  } 
  else if (question.optionTwo.votes.includes(authedUser)) {
    userAnswer = 'optionTwo'
    optionOneCount = question.optionOne.votes.length;
    optionTwoCount = question.optionTwo.votes.length;
    isAnswered = true;
  }

  return {
    question,
    optionOneCount,
    optionTwoCount,
    author,
    id,
    isAnswered,
    userAnswer,
    isAuthenticated: authedUser !== null
  };
}


export default connect(mapStateToProps)(QuestionPoll);