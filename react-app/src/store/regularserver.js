const GET_ALL_REGULAR_SERVERS = '/regularservers/getAllServers';
const GET_ONE_REGULAR_SERVER_By_ID = 'regularservers/getOneServer';
const CREATE_ONE_REGULAR_SERVER = 'regularservers/createOneServer';
const UPDATE_ONE_REGULAR_SERVER = 'regularservers/updateOneServer';
const DELETE_ONE_REGULAR_SERVER = 'regularservers/deleteOneServer'


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

//thunk action creator
export const getAllRegularServers =()=> async(dispatch)=>{
    console.log("here!!!!!")
    const response = await fetch('/api/servers/regular/current')
 
    if(response.ok){
        const data = await response.json()
        const list =data.result
        console.log("list!!!!!!!!", list)
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
        dispatch(createOneRegularServer(newRegularServer))
        return newRegularServer
    }else{
        const result = await response.json()
        return result
    }
}

export const updateRegularServer = (serverBody, regularServerId) => async(dispatch)=> {
    const response = await fetch(`/api/servers/regular/${regularServerId}`, {
        method: "PUT",
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
            action.list.forEach((server)=>{newAllRegularServers[server.id]=server})
            console.log("action.list!!!!!!!", action.list)
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
            newState={...state, [action.regularServer.id]: action.regularServer}
            return newState

        case DELETE_ONE_REGULAR_SERVER:
            newState={...state}
            delete newState[action.regularServerId]
            return newState
        
        default:
            return state
    }
}

export default regularServerReducer