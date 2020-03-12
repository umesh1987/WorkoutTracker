const router = require("express").Router()
var db = require("../models");
const path = require("path");


router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});



router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .sort({ day: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(1);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(3);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts/", (req, res) => {
    console.log("createWorkout", req.body);
    db.Workout.create({
            exercises: [req.body]
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(5, dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {

    console.log(req.params.id);
    console.log(req.body);

    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } }, { new: true })
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(7);
        })
        .catch(err => {
            res.json(err);
        });
});



module.exports = router;