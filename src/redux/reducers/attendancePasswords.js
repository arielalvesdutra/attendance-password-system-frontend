import { ADD_IN_PROGRESS_PASSWORDS,
    ADD_10_LAST_FINISHED_PASSWORDS,
    ADD_CURRENT_PASSWORD
} from '../actions/actionsTypes'

let initialState = {
    currentPassword: {},
    finishedPasswords: [],
    inProgressPasswords: []
}

export default (state =  initialState, action) => {
    switch (action.type) {
        case ADD_IN_PROGRESS_PASSWORDS: {

            return {
                ...state,
                inProgressPasswords: action.passwords
            }
        }
        case ADD_10_LAST_FINISHED_PASSWORDS: {
            return {
                ...state,
                finishedPasswords: action.passwords
            }
        }
        case ADD_CURRENT_PASSWORD: {
            return {
                ...state,
                currentPassword: action.password
            }
        }
        default: 
            return state
    }
}
