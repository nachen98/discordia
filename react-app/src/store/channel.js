const GET_ALL_CHANNELS = 'channels/getAllChannels'
const GET_ONE_CHANNEL_By_ID = 'channels/getOneChannel';
const CREATE_ONE_CHANNEL = 'channels/createOneChannel';
const UPDATE_ONE_CHANNEL = 'channels/updateOneChannel'
const DELETE_ONE_CHANNEL = 'channels/deleteOneChannel'

export const loadAllChannels = (channels) => {
    return {
        type: GET_ALL_CHANNELS,
        channels
    }
}
export const loadOneChannel = (channel) => {
    return {
        type: GET_ONE_CHANNEL_By_ID,
        channel
    }
}

const createOneChannel=(channel)=> {
    return {
        type: CREATE_ONE_CHANNEL,
        channel
    }
}

const updateOneChannel=(channel)=> {
    return {
        type: UPDATE_ONE_CHANNEL,
        channel
    }
}

const deleteOneChannel=(channelId)=> {
    return {
        type: DELETE_ONE_CHANNEL,
        channelId
    }
}

//thunk action creator
export const getOneChannel= (channelId) => async(dispatch) => {
    
    const response = await fetch(`/api/channels/${channelId}`)
    
    if(response.ok){
        const oneChannel = await response.json()
       
        dispatch(loadOneChannel(oneChannel))
    }
}

export const addOneChannel=(channelBody)=> async(dispatch)=> {
    const response = await fetch(`/api/channels`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(channelBody)
    }).catch(res=>res)

    if(response.ok){
        const newChannel = await response.json()
        dispatch(createOneChannel(newChannel))
        return newChannel
    }else{
        const result = await response.json()
        return result
    }
}

export const updateChannel = (channelBody, channelId) => async(dispatch)=> {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channelBody)
    }).catch(res=>res)
    if(response.ok){
        const updatedChannel=await response.json()
        dispatch(updateOneChannel(updatedChannel))
    }else{
        const result = await response.json();
        return result
    }
}

export const deleteChannel=(channelId)=> async(dispatch)=> {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE"
    });
    if(response.ok){
        dispatch(deleteOneChannel(channelId))
    }
}

//state object
const initialState= {}

const channelReducer = (state=initialState, action)=>{
    let newState={}
    switch(action.type){

        case GET_ALL_CHANNELS:
            newState={...state}
            action.channels.forEach((channel)=> {
                newState[channel.id]=channel
            })
            return newState
            
        case GET_ONE_CHANNEL_By_ID:
            newState={...state}
            newState[action.channel.id]=action.channel
            return newState

        case CREATE_ONE_CHANNEL:
            newState={...state}
            newState[action.channel.id]=action.channel
            return newState
        
        case UPDATE_ONE_CHANNEL:
            newState={...state, [action.channel.id]: action.channel}
            return newState
        
        case DELETE_ONE_CHANNEL:
            newState={...state}
            delete newState[action.channelId]
            return newState
        
        default:
            return state
    }
}

export default channelReducer