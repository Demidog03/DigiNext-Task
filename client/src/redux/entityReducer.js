const defaultState = {
    entities: []
}

const ADD_MANY_ENTITIES = "ADD_MANY_ENTITIES"
const DELETE_ENTITY_BY_ID = "DELETE_ENTITY_BY_ID"
const UPDATE_ENTITY_BY_ID = "UPDATE_ENTITY_BY_ID"
const ADD_ENTITY = "ADD_ENTITY"

export function entityReducer(state=defaultState, action){
    switch (action.type) {
        case ADD_MANY_ENTITIES:
            return {...state, entities: [...state.entities, ...action.payload]}
        case ADD_ENTITY:
            return {...state, entities: [...state.entities, action.payload]}
        case DELETE_ENTITY_BY_ID:
            return {...state, entities: state.entities.filter(entity => entity._id !== action.payload)}
        case UPDATE_ENTITY_BY_ID:
            return {...state, entities: [...updatedEntities(state.entities, action.payload)]}
        default:
            return {...state, entities: state.entities}
    }
}

function updatedEntities(entities, payload){
    console.log("PAYLOAD: ")
    const indexToUpdate = entities.findIndex((entity) => entity._id === payload._id)
    entities[indexToUpdate] = payload
    console.log(entities)
    return entities
}

export function addManyEntitiesAction(payload){
    return {type: ADD_MANY_ENTITIES, payload}
}
export function deleteEntityByIdAction(payload){
    return {type: DELETE_ENTITY_BY_ID, payload}
}

export function updateEntityByIdAction(payload){
    return {type: UPDATE_ENTITY_BY_ID, payload}
}
export function addEntityAction(payload){
    return {type: ADD_ENTITY, payload}
}
