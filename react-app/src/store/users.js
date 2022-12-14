const LOAD_USERS = 'users/loadUsers'
const LOAD_NEW_USER = 'users/loadNewUser'
const CLEAR_USERS = 'users/clearUsers';

export const clearUsers = () => {
    return {
        type: CLEAR_USERS
    }
}

export const loadUsers = (userList) =>{
    return {
        type: LOAD_USERS,
        userList
    }
}

export const loadNewUser = (user) => {
    return {
        type: LOAD_NEW_USER,
        user
    }
}


const initialState = {};
const usersReducer = (state = initialState, action) =>{
    // console.log("********** Action in usersReducer ************", action)
    let newState = { ...state }
    switch (action.type){
        case LOAD_USERS :
            action.userList.forEach(user => {
                newState[user.id] = user
            });
            return newState;

        case LOAD_NEW_USER:
            newState[action.user.id] = action.user;
            return newState;

        case CLEAR_USERS:
            return {};

        default :
            return state
    }
}

export default usersReducer;
