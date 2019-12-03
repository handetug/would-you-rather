import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { setAuthedUser } from '../actions/authedUser';
import Home from './Home';


//format the avar
const formatOptionLabel = ({ id, name, avatarURL, props }) => (
  <div className='login-single-user'>
	<img src={avatarURL} alt={name} className='login-user-img' /> 
	{name}
  </div>
);

class Login extends Component {
  	state = {
		userName: '',    
      	toHome: false,
    }

	handleOnChange = (value) => {
      	this.setState({
        	userName: value.id,
        })
    }

	//log-in the user
	handleSubmit = () => {
    	const { userName } = this.state;
		  const { dispatch, id } = this.props;
	
          dispatch(setAuthedUser(userName));
	
		  
      	this.setState({
        	userName: '',
          	toHome: id === null
          			? true
          			: false,
        });
      
      	if (id !== null) {
        	this.props.history.push(`/questions/${id}`)
        }
    }

	render () {
      	const { userName, toHome } = this.state;
		const { users, authedUser } = this.props;

		if (toHome || authedUser) {
        	return <Home />
        }

    	return(		

        	<div className='login-container center' >
          		<div className='bg-header'>
          			<h3 className='login-header-text' style={{color:'#1b8bb4'}}>Welcome to the Would You Rather App!</h3>
          			<p className='login-subtitle'>Please sign in to continue</p>
         		</div>
          		<hr className='hr-login-color' />
				<h2 className='login-signin-color' style={{color:'#1b8bb4'}} ><b>Sign in</b></h2>

				<Select 
					onChange={this.handleOnChange} 
					formatOptionLabel={formatOptionLabel} 
					options={users} 
					getOptionLabel={(option)=>option.id}
   					getOptionValue={(option)=>option.name}
					placeholder='Select User'
					isSearchable={false}
					className='login-select' />
				<button
					type='submit'
					disabled={userName === ''}
					onClick={this.handleSubmit}
					className='login-btn'
				>
					Sign In
				</button>
          	</div>
        );
    }
}

function mapStateToProps ({ users, authedUser }, { id }) {
	return {
    	users: Object.values(users),
      	id: id ? id : null,
      	authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Login));