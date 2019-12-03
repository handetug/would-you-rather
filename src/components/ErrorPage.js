import React, { Component } from "react";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <div className="text-center error-text"> 404 Error </div>
        <h1 className="text-center"> Page Not Found </h1>
      </div>
    );
  }
}

export default ErrorPage;