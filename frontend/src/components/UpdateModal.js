import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
function UpdateModal({id}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {dispatch} = useWorkoutsContext()
  const [title,setTitle] = useState('')
  const [load,setLoad] = useState('')
  const [reps,setReps] = useState('')
  const [error,setError] = useState(null)
  const [emptyFields,setEmptyFields] = useState([])

  const update = async () => {
    const response = await fetch('/api/workouts')
    const json = await response.json()
    if (response.ok){
        dispatch({type:'UPDATE_WORKOUT',payload:json})
    }
}
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`/api/workouts/${id}`);
            const data = await response.json();
            setTitle(data.title)
            setReps(data.reps)
            setLoad(data.load)
        } catch (error) {
            console.error('Error fetching workout:', error);
        }
        };

        if (id) {
        fetchData();
        }
    }, [id])
  const handleSubmit = async (e) => {
      e.preventDefault()

      const workout = {title,load,reps}

      const response = await fetch('/api/workouts/'+id,{
          method:'PATCH',
          body: JSON.stringify(workout),
          headers:{
              'Content-Type':'application/json'
          }
      })

      const json = await response.json()
      if (!response.ok){
          setError(json.error)
          setEmptyFields(json.emptyFields)
      }
      if(response.ok){
          setTitle('')
          setLoad('')
          setReps('')
          setError(null)
          setEmptyFields([])
          console.log('Workout updated', json)
          setShow(false)
          update()


      }}
  return (
    <>
    
      <span className="material-symbols-outlined" onClick={handleShow}>edit</span>


      <Modal show={show} onHide={handleClose}>

        <Modal.Body>
        <form className="create" onSubmit={handleSubmit}>
            <h3>Edit Workout</h3>
            <label>Exercise Title: </label>
            <input type="text" 
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title')?'error':''}
            ></input>
            
            <label>Load (in Kg)</label>
            <input type="number" 
            onChange={(e)=> setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load')?'error':''}
            ></input>

            <label>Reps:</label>
            <input type="number" 
            onChange={(e)=> setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps')?'error':''}
            ></input>

            <button>Update Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default UpdateModal;