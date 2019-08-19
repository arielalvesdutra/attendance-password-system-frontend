import {
    LOADING_ALL_PASSWORDS,
    SET_ALL_PASSWORDS,
    SET_10_LAST_FINISHED_PASSWORDS,
    SET_CURRENT_PASSWORD,
    SET_IN_PROGRESS_PASSWORDS
} from '../actions/actionsTypes'

let initialState = {
    isLoadingAllPasswords: false,
    passwords: [],
    currentPassword: {},
    finishedPasswords: [],
    inProgressPasswords: []
}

export default (state =  initialState, action) => {
    switch (action.type) {
        case LOADING_ALL_PASSWORDS: {
            return {
                ...state,
                isLoadingAllPasswords: true
            }
        }
        case SET_ALL_PASSWORDS: {
            return {
                ...state,
                passwords: action.passwords,
                isLoadingAllPasswords: false
            }
        }
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
