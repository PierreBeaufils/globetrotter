const Accommodation = require("../models/Accommodation");
const Activity = require("../models/Activity");
const Transport = require("../models/Transport");
const Travel = require("../models/Travel");
const Task = require("../models/Task");
const Traveler = require("../models/Traveler");
const Document = require("../models/Document");
const travel_has_traveler = require("../models/Travel_has_travelers");
const mailApp = require("../services/nodemailer");
const crypt = require("../services/crypt");

const objectModel = [Accommodation, Activity, Transport, Travel, Task, Traveler, travel_has_traveler];

const travelController = {
    showAllInfos: async (req, res) => {

        const travelId = req.params.id;

        let travelinfos = {};
        travelinfos = await Travel.findOneTravelComponent(null, travelId);

        if (travelinfos) {
            const travelersInTravel = await travel_has_traveler.findTravelersByTravel(travelId);
            const travelerAuthorized = travelersInTravel.find((traveler) => traveler.traveler_id === req.session.user.id);

            if (travelerAuthorized) {
                travelinfos.prices = await Travel.findPrice(travelId);
                travelinfos.traveler = await travel_has_traveler.findTravelersByTravel(travelId);
                travelinfos.transport = await Transport.findAllTravelComponent(travelId);
                travelinfos.accommodation = await Accommodation.findAllTravelComponent(travelId);
                travelinfos.activity = await Activity.findAllTravelComponent(travelId);
                travelinfos.task = await Task.findAllTravelComponent(travelId);
                travelinfos.documents = await travelController.showDocuments(req, res, travelinfos);

                res.status(200).json(travelinfos);
            } else {
                return res.status(404).json('Vous n\'avez pas accès à ce voyage');
            }
        }
        else {
            res.status(404).json('ce voyage n\'existe pas');
        };
    },
    showTravels: async (req, res) => {
        let travelInfos = {};
        travelInfos = await Travel.findAllTravelComponent();

        if (travelInfos) {
            res.json(travelInfos);
        } else {
            res.status(404).json('Il n\'existe pas de voyage');
        };
    },
    createTravel: async (req, res) => {
        const newTravel = new Travel(req.body);
        const savedTravel = await newTravel.saveAllTravelComponent();

        const travel_id = savedTravel.id;
        const traveler_id = req.body.owner;

        const newTravelerToTravel = new travel_has_traveler({ travel_id, traveler_id });
        newTravelerToTravel.saveTravelerIntoTravel();

        res.json('Voyage créé');
        // Theme / destination / date départ / date de fin
    },
    editTravel: async (req, res) => {
        const travelToEdit = await Travel.findOneTravelComponent(null, req.params.id);
        const travelEdited = await new Travel(travelToEdit);
        travelEdited.update(req.body);
        await travelEdited.saveAllTravelComponent();
        res.json('voyage mis à jour')
    },
    deleteTravel: async (req, res) => {
        const travelToFind = await Travel.findOneTravelComponent(null, req.params.id);
        if (travelToFind) {
            const travelToDelete = new Travel(travelToFind);
            await travelToDelete.delete();
            res.json("suppression effectuée");
        } else {
            res.status(404).json('cette entité n\'existe pas')
        }
    },
    showUserTravels: async (req, res) => {
        const travelerId = req.params.id;

        const userTravels = await Travel.findAllTravels(travelerId);

        if (userTravels) {
            res.json(userTravels);
        } else {
            res.status(404).json('ce voyageur n\'appartient à aucun voyage')
        }
    },
    showTravelers: async (req, res) => {
        const travelId = req.params.id;
        const travelersInTravel = await travel_has_traveler.findTravelersByTravel(travelId);
        // console.log(travelersInTravel);

        if (travelersInTravel.length > 0) {
            res.json(travelersInTravel);
        } else {
            res.status(404).json('Ce voyage ne comporte pas encore de voyageurs');
        };
    },
    sendTravelInvitation: async (req, res) => {
        const travelersToAssoc = req.body;

        for (let travelerMail in travelersToAssoc) {
            let token = crypt.getTokenTravel(req.params.id, travelersToAssoc[travelerMail]);
            console.log(token);

            let text = `Bonjour, 
        Un membre de "Globe Trotter" à décidé d'organiser un voyage et souhaite vous inviter à en faire parti,
        pour accepter son invitation cliquer simplement ici : http://localhost:8080/rejoindre/?token=${token}
        `;
            let html = `<h1> Bonjour,</h1>
        <p> Un membre de "Globe Trotter" à décidé d'organiser un voyage et souhaite vous inviter à en faire parti,
        pour accepter son invitation cliquer simplement ici : <a href="http://localhost:8080/rejoindre/?token=${token}">Rejoindre un voyage</a>
        `;
            let message = mailApp.messageConstructor(travelersToAssoc[travelerMail], token);
            message.text = text;
            message.html = html;
            mailApp.transporter.sendMail(message);
        }
        res.status(200).json("Ces voyageurs ont bien été invités");
    },
    addTravelers: async (req, res) => {

        let decryptedToken = crypt.decryptText(req.query.token);
        decryptedToken = decryptedToken.split("-");
        console.log(decryptedToken);
        // On vérifie si l'user est en BDD :
        const foundTraveler = await Traveler.findByEmail(decryptedToken[1]);
        if (foundTraveler) {
            // Que doit il se passer si l'utilisateur est déja un traveler ?
            new travel_has_traveler(foundTraveler);





            const newTraveler = new travel_has_traveler({
                travel_id: decryptedToken[0],
                traveler_id: foundTraveler.id
            });
            const addedTraveler = await newTraveler.saveTravelerIntoTravel();
            res.json("Vous avez bien été ajouté à ce voyage");
        } else {
            res.status(404).json("Il semble que vous ne soyez pas encore inscrit sur Globe Trotter, veuillez vous inscrire sur notre plateforme en suivant ce lien : http://localhost:8080/inscription")
        }




    },
    deleteTravelerFromTravel: async (req, res) => {
        const travelerToFind = await travel_has_traveler.findOneTravelerByTravel(req.params.id, req.params.travelerId);
        // console.log(travelerToFind);
        if (travelerToFind) {
            const travelerToDelete = new travel_has_traveler(travelerToFind);
            // console.log(travelerToDelete);
            await travelerToDelete.deleteTraveler()
            res.json("suppression effectuée")
        } else {
            res.status(404).json('ce voyageur n\'est pas inscrit sur ce voyage')
        }
    },
    showEntity: async (req, res) => {
        let entity = req.params.entity;
        let entityToUse;

        for (let i = 0; i < objectModel.length; i++) {
            if (entity === objectModel[i].tableName) {
                entityToUse = objectModel[i];
            }
        };

        const entityToFind = await entityToUse.findAllTravelComponent(req.params.id);
        if (entityToFind.length > 0) {
            res.json(entityToFind);
        } else {
            res.status(404).json(`Il y a 0 ${entityToUse.tableName} dans ce voyage`);
        }
    },
    showDocuments: async (req, res, travelinfos) => {
        const prefix = req.params.id + "/public/";
        const documents = await Document.getAllPublic(prefix);

        let documentsList = [];
        if (documents.Contents === undefined) {
            return documentsList;
        }
        else {
            for (let object of documents.Contents) {
                if (object.Size != 0) {
                    object.travel_id = req.params.id;
                    let documentToPush = await new Document(object);

                    delete documentToPush.ETag;
                    delete documentToPush.StorageClass;
                    documentsList.push(documentToPush);
                }
            }
            return documentsList;
        }
    },
    createEntity: async (req, res) => {
        let entity = req.params.entity;
        let entityToUse;

        if (entity === "document") {
            // console.log(req.files);
            // console.log(req.body.Key);
            const nameOfFile = req.files[0].originalname || req.body.name;
            // console.log(nameOfFile);
            const uploadParams = {
                Body: req.files[0].buffer,
                Key: `${req.params.id}/public/${nameOfFile}`,
                travel_id: req.params.id,
                ACL: "public-read"
            }
            const createdDocument = new Document(uploadParams);
            createdDocument.uploadDoc();
            res.json("le document a bien été ajouté !");
        }

        else {
            for (let i = 0; i < objectModel.length; i++) {
                if (entity === objectModel[i].tableName) {
                    entityToUse = objectModel[i];
                }
            };

            const newEntity = new entityToUse(req.body);
            newEntity.travel_id = req.params.id;

            await newEntity.saveAllTravelComponent();
            res.json('Ajout effectué');
        }
    },
    editEntity: async (req, res) => {
        let entity = req.params.entity;
        let entityToUse;

        if (entity === 'document') {
            res.json("Un document ne peux être édité, veuillez le supprimer et ajouter votre nouveau document")
        }
        else {
            for (let i = 0; i < objectModel.length; i++) {
                // console.log('objectModel[i].tableName', objectModel[i].tableName);
                if (entity === objectModel[i].tableName) {
                    entityToUse = objectModel[i];
                }
            };

            const entityToEdit = await entityToUse.findOneTravelComponent(req.params.id, req.params.entityId);

            if (entityToEdit) {
                const editedEntity = await new entityToUse(entityToEdit);
                editedEntity.update(req.body);
                editedEntity.saveAllTravelComponent();
                res.json(`${entityToUse.tableName} mise à jour`)
            } else {
                res.status(404).json('mise à jour impossible')
            }
        }
    },
    deleteEntity: async (req, res) => {
        let entity = req.params.entity;
        console.log('req.params.entity', req.params.entity);
        let entityToUse;

        if (entity === 'document') {
            const documentToDelete = req.body;
            console.log('req.body', req.body);
            const deletedDocument = new Document(documentToDelete);
            const deleteConfirmation = await deletedDocument.deleteFile();
            res.json(deleteConfirmation);
        }

        for (let i = 0; i < objectModel.length; i++) {
            if (entity === objectModel[i].tableName) {
                entityToUse = objectModel[i];
            }
        };

        const entityToFind = await entityToUse.findOneTravelComponent(req.params.id, req.params.entityId);
        if (entityToFind) {
            const entityToDelete = new entityToUse(entityToFind);
            await entityToDelete.delete();
            res.json("suppresion effectuée");
        } else {
            res.status(404).json("cette entité n'existe pas dans ce voyage");
        }
    }
};

module.exports = travelController;
