import { loadAllChannels } from "./channel";
import { loadUsers } from "./users";

const GET_ALL_REGULAR_SERVERS = '/regularservers/getAllServers';
const GET_ONE_REGULAR_SERVER_By_ID = 'regularservers/getOneServer';
const CREATE_ONE_REGULAR_SERVER = 'regularservers/createOneServer';
const UPDATE_ONE_REGULAR_SERVER = 'regularservers/updateOneServer';
const DELETE_ONE_REGULAR_SERVER = 'regularservers/deleteOneServer';
const UPDATE_SERVER_CHANNELS = 'regularservers/updateServerChannel';
const DELETE_ONE_SERVER_CHANNEL = 'regularservers/deleteOneServerChannel';
const CLEAR_REGULAR_SERVERS = 'regularServers/clearRegularServers'

export const clearRegularServers = () => {
    return {
        type: CLEAR_REGULAR_SERVERS
    }
}

const loadRegularServers=(list)=> {
    return {
        type: GET_ALL_REGULAR_SERVERS,
        list
    }
}

const loadOneRegularServer = (regularServer) => {
    return {
        type: GET_ONE_REGULAR_SERVER_By_ID,
        regularServer
    }
}

const createOneRegularServer=(regularServer)=> {
    return {
        type: CREATE_ONE_REGULAR_SERVER,
        regularServer
    }
}

const updateOneRegularServer=(regularServer)=> {
    return {
        type: UPDATE_ONE_REGULAR_SERVER,
        regularServer
    }
}

const deleteOneRegularServer=(regularServerId)=> {
    return {
        type: DELETE_ONE_REGULAR_SERVER,
        regularServerId
    }
}

export const addServerChannelUpdate = (serverId, channelId) =>{
    return {
        type: UPDATE_SERVER_CHANNELS,
        serverId,
        channelId

    }
}

export const deleteServerChannel = (serverId, channelId) => {
    return {
        type: DELETE_ONE_SERVER_CHANNEL,
        serverId,
        channelId
    }
}
//thunk action creator
export const getAllRegularServers =()=> async(dispatch)=>{

    const response = await fetch('/api/servers/regular/current')

    if(response.ok){
        const data = await response.json()
        const list =data.result
        console.log("list!!!!!!!!!-----", list)

        list.forEach((server)=> {
            let channelIdArr=[]
            let userIdArr=[]
            dispatch(loadAllChannels(server.channels))
            server.channels.forEach((channel)=> {
                channelIdArr.push(channel.id)
            })
            server.channels=channelIdArr

            dispatch(loadUsers(server.users))
            server.users.forEach((user)=>{
                userIdArr.push(user.id)
            })
            server.users=userIdArr

        })
        dispatch(loadRegularServers(list))
    }
}

export const getOneRegularServer= (regularServerId) => async(dispatch) => {

    const response = await fetch(`/api/servers/${regularServerId}`)

    if(response.ok){
        const oneRegularServer = await response.json()

        dispatch(loadOneRegularServer(oneRegularServer))
    }
}

export const addOneRegularServer=(serverBody)=> async(dispatch)=> {
    const response = await fetch(`/api/servers/regular`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(serverBody)
    }).catch(res=>res)

    if(response.ok){
        const newRegularServer = await response.json()

        const arrayOfChannelIds = newRegularServer.channels.map(channel => channel.id)
        const arrayOfUserIds = newRegularServer.users.map(user => user.id)

        // Dispatch to update the channels store
        // No need to update the user slice of state since only the owner is in user list
        // Meaning that the owner info (sessionUser) should already be in the store
        dispatch(loadAllChannels(newRegularServer.channels))

        newRegularServer.channels = arrayOfChannelIds
        newRegularServer.users = arrayOfUserIds

        dispatch(createOneRegularServer(newRegularServer))
        return newRegularServer
    }else{
        const result = await response.json()
        return result
    }
}

export const updateRegularServer = (serverBody, regularServerId) => async(dispatch)=> {
    const response = await fetch(`/api/servers/regular/${regularServerId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serverBody)
    }).catch(res=>res)
    if(response.ok){
        const updatedServer=await response.json()
        dispatch(updateOneRegularServer(updatedServer))
    }else{
        const result = await response.json();
        return result
    }
}

export const deleteRegularServer=(regularServerId)=> async(dispatch)=> {
    const response = await fetch(`/api/servers/regular/${regularServerId}`, {
        method: "DELETE"
    });
    if(response.ok){
        dispatch(deleteOneRegularServer(regularServerId))
    }
}

//state object
const initialState= {}

const regularServerReducer = (state=initialState, action)=>{

    let newState={}
    switch(action.type){
        case GET_ALL_REGULAR_SERVERS:
            newState={...state};
            const newAllRegularServers={}
            action.list.forEach((server)=>{
                newAllRegularServers[server.id]=server


            })
            // console.log("action.list!!!!!!!", action.list)
            newState=newAllRegularServers
            return newState

        case GET_ONE_REGULAR_SERVER_By_ID:
            newState={...state}
            newState[action.regularServer.id] = action.regularServer
            return newState

        case CREATE_ONE_REGULAR_SERVER:
            newState={...state}
            newState[action.regularServer.id]=action.regularServer
            return newState

        case UPDATE_ONE_REGULAR_SERVER:
            // newState={...state, [action.regularServer.id]: action.regularServer}
            newState = {...state}
            newState[action.regularServer.id] = {...state[action.regularServer.id], ...action.regularServer}
            return newState

        case DELETE_ONE_REGULAR_SERVER:
            newState={...state}
            delete newState[action.regularServerId]
            return newState

        case UPDATE_SERVER_CHANNELS:
            newState={...state}
            newState[action.serverId] = {...newState[action.serverId]}
            newState[action.serverId].channels = [...newState[action.serverId].channels, action.channelId]
            return newState

        case DELETE_ONE_SERVER_CHANNEL:
            newState={...state}
            console.log("newState before removing channel!!!!!!!!!", newState[action.serverId])
            newState[action.serverId] = {...newState[action.serverId]}
            const indexToRemove = newState[action.serverId].channels.indexOf(action.channelId)
            newState[action.serverId].channels.splice(indexToRemove, 1)
            newState[action.serverId].channels=[...newState[action.serverId].channels]
            console.log("newState after removing channel!!!!!!!!!", newState[action.serverId])
            return newState

        case CLEAR_REGULAR_SERVERS:
            return {};

        default:
            return state
    }
}

export default regularServerReducer
