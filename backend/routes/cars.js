const express = require("express");
const router = express.Router();
const csrfProtection=require("../config/csrf.js");

const limiter = require("../config/rateLimiter.js");
require('dotenv').config();

const Cars=require("../models/CarModel.js")

router.get("/", csrfProtection, limiter, async (req,res)=>{
    try {
        const voitures = await Cars.find({})
        res.status(200).json({voitures: voitures})

    } catch (err) {
        res.status(500).json({erreur: "Erreur serveur"})
        console.log("Erreur: ",err)
    }

})

router.post("/add", csrfProtection, limiter, async (req,res)=>{
    try {
       const newCar = new Cars (req.body);

       await newCar.save();
        console.log("Véhicule ajouté: ", newCar )
        res.status(200).json({message: "Véhicule ajouté avec succès"})

    } catch (err) {
        res.status(500).json({erreur: "Erreur serveur"})
        console.log("Erreur: ",err)
    }
})

router.delete("/delete/:id", csrfProtection, limiter, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Cars.findByIdAndDelete(id);

        if (!deletedCar) {
            return res.status(404).json({message: "Véhicule non trouvé"});
        }
        console.log("Véhicule supprimé: ", deletedCar);
        res.status(200).json({ message:"Véhicule supprimé avec succès"});

    } catch (err) {
        console.error("Erreur: ", err);
        res.status(500).json({erreur: "Erreur serveur"});
    }
});

router.post("/edit", csrfProtection, limiter, async (req, res) => {
    try {
        const { _id, ...updatedFields } = req.body;
        const updatedCar = await Cars.findByIdAndUpdate(_id,updatedFields);

        if (!updatedCar) {
            return res.status(404).json({ message: "Véhicule non trouvé" });
        }
        console.log("Base de données des véhicules mise à jour")
        res.status(200).json({message: "Véhicule mis à jour avec succès"});

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

module.exports=router