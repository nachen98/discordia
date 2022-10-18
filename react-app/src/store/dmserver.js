import { loadMessagesByChannel } from "./messages";

const GET_ALL_DM_SERVERS = '/dmservers/getAllServers';
// const GET_ONE_DM_SERVER_By_ID = 'dmservers/getOneServer';

const loadDmServers=(list)=> {
    return {
        type: GET_ALL_DM_SERVERS,
        list
    }
}

// const loadOneDmServer = (dmServerId) => {
//     return {
//         type: GET_ONE_DM_SERVER_By_ID,
//         dmServerId
//     }
// }


//thunk action creator
export const getAllDmServers =()=> async(dispatch)=>{
    const response = await fetch('/api/servers/dm/current')
    if(response.ok){
        const list = await response.json()
        console.log("list!!!!", list)

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
        
        default:
            return state
    }
}

export default dmServerReducer