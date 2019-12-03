export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';
export const ANSWER_QUESTION_TO_USER = 'ANSWER_QUESTION_TO_USER';

export default function user (state={}, action) {
  
	switch (action.type) {
      case RECEIVE_USERS:
        return {
          ...state,
          ...action.users
        }
      case ADD_QUESTION_TO_USER:  //save the question with author.
        return {
          ...state,
          [action.question.author]: { 
            ...state[action.question.author], 
            questions: state[action.question.author].questions.concat([action.question.id])
          }
        }
      case ANSWER_QUESTION_TO_USER:  //answer the question with author.
        return {
          ...state,
          [action.authedUser]: { 
            ...state[action.authedUser], 
            answers: {
            	...state[action.authedUser].answers,
              	[action.qid]: action.answer
            }
          }
        }
      default :
       	return state;
    }
}