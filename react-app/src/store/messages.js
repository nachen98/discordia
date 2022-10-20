const CREATE_DIRECT_MESSAGE = 'message/create_dm'
const DELETE_DIRECT_MESSAGE = 'message/delete_dm'

const CREATE_CHANNEL_MESSAGE = 'message/create_channel_message'
const DELETE_CHANNEL_MESSAGE = 'message/delete_channel_message'
const LOAD_MESSAGE_BY_CHANNEL = 'message/load_channel_message'

export const create_dm = (payload) => {
    return {
        type : CREATE_DIRECT_MESSAGE,
        payload
    }
}

const delete_dm = (payload) => {
    return {
        type : DELETE_DIRECT_MESSAGE,
        payload
    }
}

export const createChannelMessage = (payload) => {
    return {
        type : CREATE_CHANNEL_MESSAGE,
        payload
    }
}


const deleteChannelMessage = (payload) => {
    return {
        type : CREATE_CHANNEL_MESSAGE,
        payload
    }
}

export const loadMessagesByChannel = (payload) => {
    return {
        type : LOAD_MESSAGE_BY_CHANNEL,
        payload
    }
}


/**
 * get messages by channel thrunk
 * @param {*} channelId
 * @returns
 */
export const loadMessgesByChannelThunk = (channelId) => async (dispatch)=>{
    console.log("get there, channel id :",channelId )
    try{
        const response = await fetch(`/api/channels/${channelId}`)
        if (response.ok){
            const data = await response.json();
            console.log("DATA ---" , data)
            dispatch(loadMessagesByChannel(data.result))
        }

    }catch (error){
        console.log("error occured when loading channel data ",error)
        throw error
    }
}




const initialState = {};
const messagesReducer = (state = initialState, action) =>{
    console.log("********** Action in messagesReducer ************", action)
    let newState = { ...state }
    switch (action.type){
        case CREATE_DIRECT_MESSAGE :
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_DIRECT_MESSAGE :
            return newState;
        case CREATE_CHANNEL_MESSAGE :
            console.log("type of return ", typeof action.payload)
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_CHANNEL_MESSAGE :
            return newState;
        case LOAD_MESSAGE_BY_CHANNEL :
            console.log('???????? state111 ', newState)
            action.payload.messages.forEach(message => {
                console.log('???????? message ', message.id)
                
                newState[message.id] = message
            });
            console.log('???????? state   222', newState)
            return newState
        default :
            return state
    }
}

export default messagesReducer;
