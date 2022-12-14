import { addServerChannelUpdate, deleteServerChannel} from "./regularserver"

const GET_ALL_CHANNELS = 'channels/getAllChannels'
const GET_ONE_CHANNEL_By_ID = 'channels/getOneChannel';
const CREATE_ONE_CHANNEL = 'channels/createOneChannel';
const UPDATE_ONE_CHANNEL = 'channels/updateOneChannel';
const DELETE_ONE_CHANNEL = 'channels/deleteOneChannel';
const ADD_CHANNEL_MESSAGE = 'channels/addNewMessage';
const CLEAR_CHANNELS = 'channels/clearChannels';

export const clearChannels = () => {
    return {
        type: CLEAR_CHANNELS
    }
}

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

export const addChannelMessage = (messageId, channelId) =>{
    return {
        type : ADD_CHANNEL_MESSAGE,
        messageId,
        channelId,
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
        console.log("get one channel data ", oneChannel.result)

        dispatch(loadOneChannel(oneChannel.result))
    }
}

export const addOneChannel=(channelBody, serverId)=> async(dispatch)=> {
    console.log("channelBody is !!!!!!!!!!", channelBody)
    console.log("serverId is!!!!!!!!!!!!!!!", serverId)
    const response = await fetch(`/api/servers/${serverId}/channels`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(channelBody)
    }).catch(res=>res)

    if(response.ok){
        const newChannel = await response.json()
        dispatch(createOneChannel(newChannel))
        console.log('newChannel!!!!!!!!!', newChannel)
        dispatch(addServerChannelUpdate(serverId, newChannel.id))
        return newChannel
    }else{
        const result = await response.json()
        return result
    }
}

export const updateChannel = (channelBody, channelId) => async(dispatch)=> {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channelBody)
    }).catch(res=>res)
    if(response.ok){
        const updatedChannel=await response.json()
        console.log('updatedChannel!!!!!!!!!!', updatedChannel)
        dispatch(updateOneChannel(updatedChannel))
        return updatedChannel
    }else{
        const result = await response.json();
        return result
    }
}

export const deleteChannel=(serverId, channelId)=> async(dispatch)=> {
    const response = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE"
    });
    if(response.ok){
        dispatch(deleteServerChannel(serverId,channelId))
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
            console.log("new state load all channel ", newState)
            console.log(" action @@@@@@", action)
            action.channels.forEach((channel)=> {
                newState[channel.id]=channel
            })
            return newState

        case GET_ONE_CHANNEL_By_ID:
            newState={...state}
            console.log("new state chanel!!!!!!!---1" ,newState)
            console.log("action.chanel!!!!!!!" ,action.channel)

            newState[action.channel.id]=action.channel
            console.log("new state chanel!!!!!!!---2" ,newState)
            return newState

        case CREATE_ONE_CHANNEL:
            newState={...state}
            newState[action.channel.id]=action.channel
            return newState

        case UPDATE_ONE_CHANNEL:
            newState={...state, [action.channel.result.id]: action.channel.result}
            return newState

        case DELETE_ONE_CHANNEL:
            newState={...state}
            delete newState[action.channelId]
            return newState

        case ADD_CHANNEL_MESSAGE:
            newState={...state};
            newState[action.channelId] = {...newState[action.channelId]};
            newState[action.channelId].messages = [...newState[action.channelId].messages, action.messageId];
            return newState;

        case CLEAR_CHANNELS:
            return {};

        default:
            return state
    }
}

export default channelReducer
