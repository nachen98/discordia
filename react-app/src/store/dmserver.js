import { loadMessagesByChannel } from "./messages";

const GET_ALL_DM_SERVERS = '/dmservers/getAllServers';
const ADD_DM_SERVER_MESSAGE = '/dmservers/addMessage';
// const GET_ONE_DM_SERVER_By_ID = 'dmservers/getOneServer';
const LOAD_NEW_DM_SERVER = '/dmServers/loadNewDmServer'
const CLEAR_DM_SERVERS = '/dmServers/clearDmServers'

export const clearDmServers = () => {
    return  {
        type: CLEAR_DM_SERVERS
    }
}

const loadDmServers=(list)=> {
    return {
        type: GET_ALL_DM_SERVERS,
        list
    }
}

export const addDmServerMessage = (messageId, serverId) =>{
    return {
        type: ADD_DM_SERVER_MESSAGE,
        messageId,
        serverId
    }
}

// const loadOneDmServer = (dmServerId) => {
//     return {
//         type: GET_ONE_DM_SERVER_By_ID,
//         dmServerId
//     }
// }

const loadNewDmServer = (dmServer) => {
    return {
        type: LOAD_NEW_DM_SERVER,
        dmServer
    }
}


//thunk action creator
export const getAllDmServers =()=> async(dispatch)=>{
    const response = await fetch('/api/servers/dm/current')
    if(response.ok){
        const list = await response.json()
        console.log("list!!!!!!!!!!!!!", list)

        list.result.forEach(server=> {

            dispatch(loadMessagesByChannel(server))
            let messageIdArr=[]
            server.messages.forEach(message=>{
                messageIdArr.push(message.id)
            })
            server.messages=messageIdArr
        })
        dispatch(loadDmServers(list))
    }
}

export const createDmServer = (dmServerName) => async (dispatch) => {
    const response = await fetch(`/api/servers/dm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: dmServerName})
    }).catch(res => res)

    if (response.ok) {
        const newDmServer = await response.json();
        dispatch(loadNewDmServer(newDmServer));
        return newDmServer
    } else {
        const result = await response.json();
        console.log('the error message from creating dm server is ', result)
        return result;
    }
}


//state object
const initialState= {}

const dmServerReducer = (state=initialState, action)=>{
    let newState={}
    switch(action.type){
        case GET_ALL_DM_SERVERS:
            newState={...state};
            const newAllDmServers={}
            action.list.result.forEach((server)=>{newAllDmServers[server.id]=server})
            newState=newAllDmServers
            return newState

        case ADD_DM_SERVER_MESSAGE:
            console.log('adding a message to dm server....')
            if (!state[action.serverId]){
                console.log("current state...", state);
                return state;
            }
            if (state[action.serverId].messages.includes(action.messageId)){
                return state;
            }
            newState = {...state};
            newState[action.serverId] = {...newState[action.serverId]};
            newState[action.serverId].messages = [...newState[action.serverId].messages, action.messageId]
            return newState;

        case LOAD_NEW_DM_SERVER:
            newState = {...state};
            newState[action.dmServer.id] = action.dmServer
            return newState;

        case CLEAR_DM_SERVERS:
            return {};

        default:
            return state
    }
}

export default dmServerReducer
