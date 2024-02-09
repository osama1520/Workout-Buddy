import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateModal from "./UpdateModal"

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()


    const handleClick = async () =>{
        
        const response = await fetch('/api/workouts/' + workout._id,{
            method:'DELETE'
        })

        const json = await response.json()

        if (response.ok){
            dispatch({type:"DELETE_WORKOUT",payload:json})
        }

    }


    return (
        <div className="workout-details" >
            <div>
                <h4>{workout.title}</h4>
                <p><strong>Load (kg): </strong>{workout.load}</p>
                <p><strong>Reps: </strong>{workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
            </div>
            <div className="div2">
                    <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                    <UpdateModal id={workout._id}/>
            </div>
            

        </div>
    )
}

export default WorkoutDetails