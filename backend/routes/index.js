const express = require("express");
const authController = require("../controllers/authController");
const politicalPartyController = require("../controllers/politicalPartyController");
const candidateController = require("../controllers/candidateController");
const announcementController = require("../controllers/announcementController");
const feedbackController = require("../controllers/feedbackController");
const contactController = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");
const electionController = require("../controllers/electionController");
const voteController = require("../controllers/voteController");
const adminController = require("../controllers/adminController");
const resultController = require("../controllers/resultController");
const router = express.Router();



router.post("/register", authController.register);
router.post("/login",authController.login);
router.get("/voter/:id", authController.getVoterById);
router.get("/voters", authController.getAll)
router.put("/update-profile", authController.update);


router.post("/register-admin", authController.adminRegister);
router.post("/login-admin",authController.adminLogin);
router.get("/admin/:id", authController.getAdminById);
router.put("/admin-update", adminController.update);
router.get("/admins", adminController.getAll);
router.put("/update-status", adminController.active);
// router.

router.post("/official-login", authController.officialLogin);

router.post("/register-party", politicalPartyController.register);
router.get("/parties", politicalPartyController.getAll);
router.get("/party/:id",politicalPartyController.getById);
router.put("/update-party", politicalPartyController.update);
router.get("/mail", politicalPartyController.sendMail);
router.put("/change-password", politicalPartyController.changePassword);


//candidate routes
router.post("/register-candidate", candidateController.register);
router.get("/candidate/:id", candidateController.getById);
router.get("/candidates", candidateController.getAll);
router.put("/update", candidateController.update);
router.put("/approval", candidateController.approval);

router.get("/candidates/:partyId", candidateController.getByPartyId);




router.get("/announcements", announcementController.getAll);
router.post("/post-announcements",announcementController.create);
router.put("/update-announcements", announcementController.update);
router.delete("/delete/:id", announcementController.delete);


router.get("/feedbacks", feedbackController.getAll);
router.post("/post-feedback", feedbackController.create);


router.post("/post-contact", contactController.create);
router.get("/contacts", contactController.getAll);


router.post("/register-election", electionController.create );
router.get("/elections", electionController.getAll);
router.put("/update/status",electionController.status);
router.get("/election/status/:id", electionController.getStatus);
router.get("/election/party/p/:id", electionController.getByPartyId);


//blockchain
router.post("/vote/candidate/:id", voteController.vote);
router.get("/totalVotes/:id", resultController.totalVotes);
router.get("/resultListByElection/:id", resultController.resultListByElection);
router.get("/selected/candidate/:id", resultController.selectedCandidate);


router.get('/candidateVotedList', candidateController.getList);

module.exports = router;