const LOAD_USERS = 'users/loadUsers'



export const loadUsers = (userList) =>{
    return {
        type: LOAD_USERS,
        userList
    }
}


const initialState = {};
const usersReducer = (state = initialState, action) =>{
    console.log("********** Action in usersReducer ************", action)
    newState = { ...state }
    switch (action.type){
        case LOAD_USERS :
            action.userList.forEach(user => {
                newState[user.id] = user
            });
            return newState;
        default :
            return state
    }
}

export default usersReducer;