import axios from "axios";
import {
    addEntityAction,
    addManyEntitiesAction,
    deleteEntityByIdAction,
    updateEntityByIdAction
} from "../redux/entityReducer.js";

export function fetchEntities(){
    return function (dispatch){
        axios.get('http://localhost:5000/entities')
            .then((response) => {
                const fetchedEntities = response.data;
                dispatch(addManyEntitiesAction(fetchedEntities))
            })
            .catch((error) => {
                console.error('Error fetching entities:', error);
            });
    }
}

export function deleteEntityById(id){
    return function (dispatch){
        axios.post("http://localhost:5000/entities/entity/" + id )
            .then((response) => {
                console.log(response)
                dispatch(deleteEntityByIdAction(id))
            })
            .catch((error) => {
                console.error('Error deleting entity:', error);
            });
    }
}

export function updateEntityById(id, request){
    return function (dispatch){
        console.log(id)
        axios.put(("http://localhost:5000/entities/entity/" + id), request)
            .then((response) => {
                console.log(response)
                dispatch(updateEntityByIdAction(response.data))
            })
            .catch((error) => {
                console.error('Error updating entity:', error);
            });
    }
}

export function addEntity(newEntity){
    return function (dispatch){
        axios.post(("http://localhost:5000/entities/entity"), newEntity)
            .then((response) => {
                console.log(response)
                dispatch(addEntityAction(response.data))
            })
            .catch((error) => {
                console.error('Error adding entity:', error);
            });
    }
}
