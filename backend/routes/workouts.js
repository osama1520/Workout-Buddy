const express = require('express')

const {getWorkouts,
    getWorkout,
    createWorkout,deleteWorkout,updateWorkout
} = require('../controllers/workoutController')
const router = express.Router()

router.get('/',getWorkouts)

router.get('/:id',getWorkout)

// // post a new workout

router.post('/', createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)

module.exports = router