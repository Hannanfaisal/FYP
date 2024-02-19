const express = require("express");
const authController = require("../controllers/authController");
const politicalPartyController = require("../controllers/politicalPartyController");
const candidateController = require("../controllers/candidateController");
const announcementController = require("../controllers/announcementController");
const router = express.Router();


  
router.post("/login",authController.login);

router.post("/register", politicalPartyController.register);


router.post("/register-candidate", candidateController.register)

router.get("/candidate/:id", candidateController.getById)

router.get("/candidates", candidateController.getAll)

router.put("/update", candidateController.update)



router.get("/announcements", announcementController.getAll)
router.delete("/delete/:id", announcementController.delete)






module.exports = router;