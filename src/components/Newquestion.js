import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";
import Login from './Login';


class newquestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    isSubmitted: false
  };

  handleOptionOneChange = e => {
    const text = e.target.value;
    this.setState({
      optionOneText: text
    });
  };
  handleOptionTwoChange = e => {
    const text = e.target.value;
    this.setState({
      optionTwoText: text
    });
  };

  //save the new question
  handleSubmit = () => {
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;

    this.setState({
      isSubmitted: true
    });

    dispatch(handleAddQuestion(optionOneText, optionTwoText));
  };

  render() {
    const { optionOneText, optionTwoText, isSubmitted } = this.state;
    const { loginControl} = this.props;

    if (!loginControl) { 
			return <Login/>
		}

    if (isSubmitted) {
      return <Redirect to="/" />;
    }

    return (
      <div className="center" style={{ width: "100%" }}>
        <Card className="text-center">
          <Card.Header style={{ color: '#191970', fontSize: 30 }}> <b>Create New Question</b></Card.Header>
          <Card.Body>
            <Card.Title style={{ color: '#00688b', fontSize: 22 }}>Please complete the question:</Card.Title>
            <Card.Text style={{ color: '#cd3333', fontSize: 18 }}>Would you rather...</Card.Text>
            <form className="new-tweet" onSubmit={this.handleSubmit}>
              <textarea tyle={{ color: '#cd3333', fontSize: 15 }}
                placeholder="Enter Option One Text Here"
                value={optionOneText}
                onChange={this.handleOptionOneChange}
                className="textarea"
              />
              <h6 className="text-center" style={{ color: '#00688b', fontSize: 20 }}>Or</h6>
              <textarea tyle={{ color: '#cd3333', fontSize: 15 }}
                placeholder="Enter Option Two Text Here"
                value={optionTwoText}
                onChange={this.handleOptionTwoChange}
                className="textarea"
              />
              <h6 className="text-center" >&nbsp;</h6>
              <Button style={{ alignContent: 'center' }}
                type="submit"
                disabled={optionOneText === "" || optionTwoText === ""}
              >
                Submit
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
	return {
	  loginControl: authedUser !== null
	};
  }
  
export default connect(mapStateToProps)(newquestion);