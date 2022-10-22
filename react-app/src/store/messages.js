const CREATE_DIRECT_MESSAGE = 'message/create_dm'
const DELETE_DIRECT_MESSAGE = 'message/delete_dm'

const CREATE_CHANNEL_MESSAGE = 'message/create_channel_message'
const DELETE_CHANNEL_MESSAGE = 'message/delete_channel_message'
const LOAD_MESSAGE_BY_CHANNEL = 'message/load_channel_message'
const LOAD_DM_SERVER_MESSAGE_BY_USER = 'message/load_dm_server_message'
const LOAD_MESSAGES_BY_DM_ID = 'message/load_messsage_by_dm_id'

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



export const loadMessagesByDmServerId = (payload) => {
    return {
        type : LOAD_MESSAGES_BY_DM_ID,
        payload
    }
}

const getDMServerMessages = (payload) => {
    return {
        type : LOAD_DM_SERVER_MESSAGE_BY_USER,
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

export const loadMessgesByDmServerId = (serverId) => async (dispatch)=>{
    console.log("load messages by dm id, serverId id :",serverId )
    try{
        const response = await fetch(`/api/messages/${serverId}`)
        if (response.ok){
            const data = await response.json();
            console.log("messages by dm server id ---" , data)
            dispatch(loadMessagesByDmServerId(data.result))
        }

    }catch (error){
        console.log("error occured when loading channel data ",error)
        throw error
    }
}



export const loadDMServerMessagesByRecipintId = (userId) => async (dispatch) =>{
    console.log ('get dm server_msg with recipint', userId);
    try {
        const response = await fetch(`/api/dmservermessages/${userId}`);
        if (response.ok) {
            const data = await response.json();
            console.log("DM server_messages  ----", data);
            dispatch(getDMServerMessages(data.result))
        }
    }catch (error){
        console.log("error occured when loading dm server and message")
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

        case LOAD_DM_SERVER_MESSAGE_BY_USER:
            console.log("get action payload of dm_server_message: ", action.payload);
            action.payload.messages.forEach(message => {
                console.log( '----- dm server msg  state111 ', newState)
                newState[message.id] = message
            })
            console.log('----- dm server msg  state222 ', newState)
            return newState
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
