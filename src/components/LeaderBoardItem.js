import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'


class LeaderBoardItem extends Component {
  render() {
    const { userId, users } = this.props;
    const user = users[userId];

    const answerCount = Object.keys(user.answers).length;
    const questionCount = user.questions.length;
    const totalCount = answerCount + questionCount;

    return (
      <div className="center" style={{ width: "100%" }}>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Row>
              <Col md={4}>
                <img
                  src={user.avatarURL}
                  alt={`Photo of ${user.name}`}
                  className="photos"
                />
              </Col>
              <Col md={4}>
                <h6 style={{ width: "100%" , fontSize:20, color:'#1b8bb4'}}>
                  {`${user.name}`} - ({totalCount} pts)
                </h6>
              </Col>
            </Row>
            <Row>
              <Col>Questions Answered : {answerCount}</Col>
            </Row>
            <Row>
              <Col>Questions Asked : {questionCount}</Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(mapStateToProps)(LeaderBoardItem)