const CreatorProfile = require("../models/CreatorProfileModel");

const createCreatorProfile = async (req, res) => {
  try {
    const newProfile = new CreatorProfile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
};
const getAllCreatorProfiles = async (req, res) => {
  try {
    const profiles = await CreatorProfile.find().populate("user");
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profiles", error });
  }
};

const getCreatorProfileById = async (req, res) => {
  try {
    const profile = await CreatorProfile.findById(req.params.id).populate(
      "user"
    );
    console.log(profile);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error });
  }
};

const updateCreatorProfile = async (req, res) => {
  try {
    const updatedProfile = await CreatorProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("user");
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

const deleteCreatorProfile = async (req, res) => {
  try {
    const deletedProfile = await CreatorProfile.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

const creatorProfileByUserId = async (req, res) => {
  try {
    const profile = await CreatorProfile.findOne({
      user: req.params.id,
    }).populate("user");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error });
  }
};

const updateExperiance = async (req, res) => {
  try {
    const { experienceId, role, company, duration, location, workDetails } =
      req.body;

    // Find the profile by ID
    const profile = await CreatorProfile.findById(req.params.id).populate(
      "user"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Check if the experience already exists in the array
    const experienceIndex = profile.experience.findIndex(
      (exp) => exp._id.toString() === experienceId
    );

    if (experienceIndex !== -1) {
      // Update existing experience
      profile.experience[experienceIndex] = {
        ...profile.experience[experienceIndex],
        role,
        company,
        duration,
        location,
        workDetails,
      };
    } else {
      // Push new experience if not found
      profile.experience.push({
        role,
        company,
        duration,
        location,
        workDetails,
      });
    }

    // Save the updated profile
    const updatedProfile = await profile.save();

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

const removeExperience = async (req, res) => {
  try {
    const { experienceId } = req.body;

    // Find the profile by ID
    const profile = await CreatorProfile.findById(req.params.id).populate(
      "user"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Filter out the experience with the given experienceId
    const updatedExperience = profile.experience.filter(
      (exp) => exp._id.toString() !== experienceId
    );

    if (updatedExperience.length === profile.experience.length) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Update the profile's experience array
    profile.experience = updatedExperience;

    // Save the updated profile
    const updatedProfile = await profile.save();

    res
      .status(200)
      .json({ message: "Experience removed successfully", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Error removing experience", error });
  }
};

const updateProject = async (req, res) => {
  try {
    const {
      projectId,
      title,
      date,
      description,
      repoLink,
      cloneLink,
      starts,
      forks,
      updatedOn,
    } = req.body;

    // Find the profile by ID
    const profile = await CreatorProfile.findById(req.params.id).populate(
      "user"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Check if the project already exists in the array
    const projectIndex = profile.projects.findIndex(
      (proj) => proj._id.toString() === projectId
    );

    if (projectIndex !== -1) {
      // Update existing project
      profile.projects[projectIndex] = {
        ...profile.projects[projectIndex],
        title,
        date,
        description,
        repoLink,
        cloneLink,
        starts,
        forks,
        updatedOn,
      };
    } else {
      // Push new project if not found
      profile.projects.push({
        title,
        date,
        description,
        repoLink,
        cloneLink,
        starts,
        forks,
        updatedOn,
      });
    }

    // Save the updated profile
    const updatedProfile = await profile.save();

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error updating projects", error });
  }
};

const removeProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    // Find the profile by ID
    const profile = await CreatorProfile.findById(req.params.id).populate(
      "user"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Filter out the project to be removed
    profile.projects = profile.projects.filter(
      (proj) => proj._id.toString() !== projectId
    );

    // Save the updated profile
    const updatedProfile = await profile.save();

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error removing project", error });
  }
};
const removeEducation = async (req, res) => {
  try {
    const { educationId } = req.body;

    // Find the profile by ID
    const profile = await CreatorProfile.findById(req.params.id).populate(
      "user"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Filter out the education entry to be removed
    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== educationId
    );

    // Save the updated profile
    const updatedProfile = await profile.save();

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Error removing education", error });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPortfolio = await CreatorProfile.findByIdAndDelete(id);
    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting portfolio", error });
  }
};

// Controller to add education to a creator's profile
const addEducation = async (req, res) => {
  try {
    const { id } = req.params; // The creator profile ID
    const newEducation = req.body; // New education data

    // Find the profile by ID
    const profile = await CreatorProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Push the new education data to the education array
    profile.education.push(newEducation);

    // Save the updated profile
    const updatedProfile = await profile.save();

    // Return the updated profile
    res.status(200).json({
      message: "Education added successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding education", error });
  }
};

const addSkill = async (req, res) => {
  try {
    const { id } = req.params; // The creator profile ID
    const { name, rating, certification } = req.body; // Destructure skill data

    // Find the profile by ID
    const profile = await CreatorProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Create the new skill object
    const newSkill = { name, rating, certification };

    // Push the new skill to the skills array
    profile.skills.push(newSkill);

    // Save the updated profile
    const updatedProfile = await profile.save();

    // Return the updated profile
    res.status(200).json({
      message: "Skill added successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding skill", error });
  }
};
const addProject = async (req, res) => {
  try {
    const { id } = req.params; // The creator profile ID
    const { title, date, description, repoLink, cloneLink, stars, forks, updatedOn } = req.body; // Destructure project data

    // Find the profile by ID
    const profile = await CreatorProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Create the new project object
    const newProject = {
      title,
      date,
      description,
      repoLink,
      cloneLink,
      stars,
      forks,
      updatedOn,
    };

    // Push the new project to the projects array
    profile.projects.push(newProject);

    // Save the updated profile
    const updatedProfile = await profile.save();

    // Return the updated profile
    res.status(200).json({
      message: "Project added successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding project", error });
  }
};

const removeSkill = async (req, res) => {
  try {
    const { id } = req.params; // The creator profile ID
    const { skillId } = req.body; // Skill ID to remove

    // Find the profile by ID
    const profile = await CreatorProfile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Remove the skill from the skills array
    profile.skills = profile.skills.filter(
      (skill) => skill._id.toString() !== skillId
    );

    // Save the updated profile
    const updatedProfile = await profile.save();

    // Return the updated profile
    res.status(200).json({
      message: "Skill removed successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing skill", error });
  }
};

module.exports = {
  createCreatorProfile,
  getAllCreatorProfiles,
  getCreatorProfileById,
  updateCreatorProfile,
  deleteCreatorProfile,
  creatorProfileByUserId,
  updateExperiance,
  removeExperience,
  updateProject,
  removeProject,
  removeEducation,
  addEducation,
  addSkill,
  removeSkill,
  deletePortfolio,
  addProject,
};
