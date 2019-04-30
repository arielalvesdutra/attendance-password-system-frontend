import { ADD_IN_PROGRESS_PASSWORDS,
     ADD_10_LAST_FINISHED_PASSWORDS,
     ADD_CURRENT_PASSWORD
} from './actionsTypes'

export const addInProgressPasswords = attendancePasswords => {
    return {
        type: ADD_IN_PROGRESS_PASSWORDS,
        passwords: attendancePasswords
    }
}

export const add10LastFinishedPasswords = attendancePasswords => {
    return {
        type: ADD_10_LAST_FINISHED_PASSWORDS,
        passwords: attendancePasswords
    }
}

export const addCurrentPassword = attendancePassword => {
    return {
        type: ADD_CURRENT_PASSWORD,
        password: attendancePassword
    }
}

