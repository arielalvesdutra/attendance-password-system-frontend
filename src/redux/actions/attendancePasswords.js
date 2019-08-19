import {
    LOADING_ALL_PASSWORDS,
    SET_ALL_PASSWORDS,
    SET_CURRENT_PASSWORD,
    SET_10_LAST_FINISHED_PASSWORDS,
    SET_IN_PROGRESS_PASSWORDS
} from './actionsTypes'

import axios from '../../axios'

export const fetchAllPasswords = () => {
    return dispatch => {

        dispatch(loadingAllPasswords())

        axios.get('/attendance-passwords')
        .then(response => {
            
            const data = response.data

            dispatch(setAllPasswords(data))

        }).catch(error => error)
    }
}

export const fetchCurrentPassword = () => {
    return dispatch => {
        axios.get('/attendance-passwords/search/retrieve-last-in-progress')
        .then(response => {
            
            const data = response.data

            dispatch(setCurrentPassword(data))

        }).catch(error => error)
    }
}

export const fetch10LastFinishedPasswords = () => {
    return dispatch => {
        axios.get('/attendance-passwords/search/retrieve-10-last-finished')
        .then(response => {
            
            const data = response.data

            dispatch(set10LastFinishedPasswords(data))

        }).catch(error => error)
    }
}

export const fetchInProgressPasswords = () => {
    return dispatch => {
        axios.get('/attendance-passwords/search/retrieve-in-progress')
        .then(response => {
            
            const data = response.data

            dispatch(setInProgressPasswords(data))

        }).catch(error => error)
    }
}

export const loadingAllPasswords = () => {
    return {
        type: LOADING_ALL_PASSWORDS
    }
}

export const setAllPasswords = passwords => {
    return {
        type: SET_ALL_PASSWORDS,
        passwords: passwords
    }
}

export const setCurrentPassword = data => {
    return {
        type: SET_CURRENT_PASSWORD,
        currentPassword: data
    }
}

export const set10LastFinishedPasswords = data => {
    return {
        type: SET_10_LAST_FINISHED_PASSWORDS,
        finishedPasswords: data
    }
}

export const setInProgressPasswords = data => {
    return {
        type: SET_IN_PROGRESS_PASSWORDS,
        inProgressPasswords: data
    }
}
