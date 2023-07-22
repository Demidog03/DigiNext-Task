import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import cl from "./Entities.module.css"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {addEntity, deleteEntityById, fetchEntities, updateEntityById} from "../../asyncActions/entities.js";
import Modal from "../components/UI/modal/Modal.jsx";
import {addManyEntitiesAction} from "../../redux/entityReducer.js";
import deleteIcon from '../../assets/delete.png'
import editIcon from '../../assets/edit.png'

function Entities() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const entities = useSelector(state => state.entities.entities)
    const [isClicked, setIsClicked] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState({})
    const [isClickedForm, setIsClickedForm] = useState(false)


    /*REFS*/
    const nameInputRef = useRef(null)
    const xInputRef = useRef(null)
    const yInputRef = useRef(null)
    const labelInputRef = useRef(null)

    const entityRows = entities.map(entity => {
        const {_id, name, coordinate, labels} = entity
        console.log(entity)
        return (
            <tr onClick={() => {getEntityById(_id), setIsClicked(true)}}>
                <td>{name}</td>
                <td>{coordinate.x}, {coordinate.y}</td>
                <td>{labels.map(label => <span>{label} </span>)}</td>
            </tr>
        )
    })

    async function getEntityById(id){
        await axios.get("http://localhost:5000/entities/entity/" + id )
            .then((response) => {
                const fetchedEntity = response.data;
                setSelectedEntity(fetchedEntity)
            })
            .catch((error) => {
                console.error('Error fetching entities:', error);
            });
    }

    function deleteEntity(id){
        dispatch(deleteEntityById(selectedEntity._id))
        setIsClicked(false)
    }

    function updateEntity(id, request){
        dispatch(updateEntityById(id, request))
        setIsClicked(false)
    }

    function addNewEntity(e){
        e.preventDefault();
        const newEntity = {
            name: nameInputRef.current.value,
            coordinate: {
                x: xInputRef.current.value,
                y: xInputRef.current.value,
            },
            labels: labelInputRef.current.value.split(', ')
        }
        dispatch(addEntity(newEntity))
        setIsClickedForm(false)
    }


    return (
        <div>
            <h1>Entities</h1>
            <table className={cl.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Coordinate</th>
                        <th>Labels</th>
                    </tr>
                </thead>
                <tbody>
                    {entityRows}
                    <Modal visible={isClicked} setVisible={setIsClicked}>
                            {
                                selectedEntity!=={} && selectedEntity.coordinate ?
                                    <div className={cl.selectedEntityWrapper}>
                                        <p><span>Name:</span> {selectedEntity.name}
                                            <img src={editIcon} alt=""
                                                 onClick={() => updateEntity(selectedEntity._id, {
                                                     name: prompt("New entity name: ")
                                                 })}/>
                                        </p>
                                        <p><span>Coordinate:</span> {selectedEntity.coordinate.x}, {selectedEntity.coordinate.y}
                                            <img src={editIcon} alt=""
                                                 onClick={() => updateEntity(selectedEntity._id, {
                                                     coordinate: {
                                                         x: prompt("New X coordinate: "),
                                                         y: prompt("New Y coordinate: "),
                                                     }
                                                 })}
                                            />
                                        </p>
                                        <p className={cl.labels}><span>Labels:</span> {selectedEntity.labels.map(label => <p>{label}</p>)}
                                        </p>
                                        <button onClick={() => deleteEntity(selectedEntity._id)}><img src={deleteIcon} alt=""/></button>
                                    </div>
                                    : <></>
                            }
                    </Modal>
                </tbody>
            </table>
            <button onClick={() => navigate("/chart")}>Visualize the data</button>
            <button onClick={() => setIsClickedForm(true)}>Add new Entity</button>
            <Modal visible={isClickedForm} setVisible={setIsClickedForm}>
                <form className={cl.newEntityForm}>
                    <label><input type="text" placeholder={"Name: "} ref={nameInputRef}/></label>
                    <label><input type="number" placeholder={"Coordinate X: "} ref={xInputRef}/></label>
                    <label><input type="number" placeholder={"Coordinate Y: "} ref={yInputRef}/></label>
                    <label><input type="text" placeholder={"Many labels (type through commas)"} ref={labelInputRef}/></label>
                    <button onClick={addNewEntity}>Submit</button>
                </form>
            </Modal>
        </div>
    );
}

export default Entities;
