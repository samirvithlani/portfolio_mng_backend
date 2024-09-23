const router = require("express").Router();
const creatorProfileController = require("../controllers/CreatorProfileController");
// Create a profile
router.post("/", creatorProfileController.createCreatorProfile);

// Get all profiles
router.get("/", creatorProfileController.getAllCreatorProfiles);

// Get a profile by ID
router.get("/:id", creatorProfileController.getCreatorProfileById);

// Update a profile by ID
router.put("/:id", creatorProfileController.updateCreatorProfile);

// Delete a profile by ID
router.delete("/:id", creatorProfileController.deleteCreatorProfile);

router.get("/user/:id", creatorProfileController.creatorProfileByUserId);

router.put("/updateexperience/:id", creatorProfileController.updateExperiance);

router.put("/removeexperience/:id", creatorProfileController.removeExperience);

router.put("/updateproject/:id", creatorProfileController.updateProject);

router.put("/removeproject/:id", creatorProfileController.removeProject);

router.delete('/profile/:id/education', creatorProfileController.removeEducation);

router.post('/profile/:id/education', creatorProfileController.addEducation);

router.post('/profile/:id/skills', creatorProfileController.addSkill);

router.delete('/profile/:id/skills', creatorProfileController.removeSkill);

router.delete("/delete/:id",creatorProfileController.deletePortfolio);

router.post("/addproject/:id",creatorProfileController.addProject);



module.exports = router;
