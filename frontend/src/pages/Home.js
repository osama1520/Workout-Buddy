import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import {useAuthContext} from '../hooks/useAuthContext'

// components

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutsForm from '../components/WorkoutsForm'
const Home = ()=>{

    const {workouts,dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok){
                dispatch({type:'SET_WORKOUTS',payload:json})
            }
        }
        if (user){
            fetchWorkouts()
        }
        
    },[dispatch,user])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}  />
                ))}
            </div>
            <WorkoutsForm/>
          
        </div>
    )
}

export default Home