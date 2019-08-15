import {
    SET_10_LAST_FINISHED_PASSWORDS,
    SET_CURRENT_PASSWORD,
    SET_IN_PROGRESS_PASSWORDS
} from '../actions/actionsTypes'

let initialState = {
    currentPassword: {},
    finishedPasswords: [],
    inProgressPasswords: []
}

export default (state =  initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PASSWORD: {
            return {
                ...state,
                currentPassword: action.currentPassword
            }
        }
        case SET_10_LAST_FINISHED_PASSWORDS: {
            return {
                ...state,
                finishedPasswords: action.finishedPasswords
            }
        }
        case SET_IN_PROGRESS_PASSWORDS: {
            return {
                ...state,
                inProgressPasswords: action.inProgressPasswords
            }
        }

        default: 
            return state
    }
}
