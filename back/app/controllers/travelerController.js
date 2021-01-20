const Traveler = require('../models/Traveler')

const travelerController = {

    allTravelers: async (req, res) => {
        const travelers = await Traveler.findAllTravelComponent();
        res.json(travelers);
    },
    newTraveler: async (req, res) => {
        const newTraveler = new Traveler(req.body);
        await newTraveler.saveAllTravelComponent();
        res.json(newTraveler);
    },
    editTraveler: async (req, res) => {
        const traveler = await Traveler.findOneTravelComponent(null, req.params.id);
        const travelerToEdit = new Traveler(traveler);
        travelerToEdit.update(req.body);
        travelerToEdit.saveAllTravelComponent();
        res.status(200).json('voyageur mis à jour')
    },
    deleteTraveler: async (req, res) => {
        const traveler = await Traveler.findOneTravelComponent(null, req.params.id);
        if (traveler) {
            const travelerToDelete = new Traveler(traveler);
            await travelerToDelete.delete();
            res.json('suppression effectuée');
        } else {
            res.status(404).json('ce voyageur n\'existe pas')
        }
        
        // if (!traveler) {
        //     res.json('voyageur introuvable');
        // } else {
        //     await traveler.delete();
        //     res.json ('suppression effectuée');
        // }
    },
    getOneTraveler: async (req, res) => {
        const foundTraveler = await Traveler.findOneTravelComponent(null, req.params.id);

        if (foundTraveler) {
            res.json(foundTraveler);
        } else {
            res.status(404).json('ce voyageur n\'existe pas')
        }
    },

    // allTravelers: async (req,res) => {
    //     const travelers = await Traveler.findAll();
    //     res.json(travelers);
    // },

    // editTraveler: async (req, res) => {
    //     const traveler = await Traveler.findOne(req.params.id);

    //     const travelerToEdit = new Traveler(traveler);

    //     if (travelerToEdit) {
    //         travelerToEdit.update(req.body);
    //         await travelerToEdit.save();
    //         res.json(travelerToEdit)
    //     }
    // }, 

    // deleteTraveler: async (req,res)=> {
    //     const traveler = await Traveler.findOne(req.params.id);
    //     // console.log(traveler.id);
    //     if (traveler) {
    //         const travelerToDelete = new Traveler(traveler);
    //         await travelerToDelete.delete();
    //         res.json ('suppression effectuée');
    //     } else {
    //         res.json('Suppression impossible')
    //     };
    // }    
}

module.exports = travelerController