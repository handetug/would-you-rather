export const ADD_QUESTION_USER = 'ADD_QUESTION_USER';
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER';
export const RECEIVE_USERS = 'RECEIVE_USERS';



export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function answerQuestionToUser({ authedUser, qid, answer }) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function addQuestionToUser({ authedUser, qid }) {
    return {
        type: ADD_QUESTION_USER,
        authedUser,
        qid,
    }
}