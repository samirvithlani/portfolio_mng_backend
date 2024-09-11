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

module.exports = router;
