const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creatorProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    basicDetails: {
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      headline: { type: String, default: '' },
      linkedinId: { type: String, default: '' },
      githubId: { type: String, default: '' },
      twitterId: { type: String, default: '' },
      mediumId: { type: String, default: '' },
      description1: { type: String, default: '' },
      description2: { type: String, default: '' },
    },
    experience: [
      {
        role: { type: String, default: '' },
        company: { type: String, default: '' },
        duration: { type: String, default: '' },
        location: { type: String, default: '' },
        workDetails: [{ type: String, default: '' }],
      },
    ],
    skills: [
      {
        name: { type: String, default: '' },
        rating: { type: Number, default: 0 },
        certification: { type: String, default: '' },
      },
    ],
    education: [
      {
        degree: { type: String, default: '' },
        major: { type: String, default: '' },
        school: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: Date, default: null },
        endDate: { type: Date, default: null },
        details: [{ type: String, default: '' }],
        courses: [{ type: String, default: '' }],
      },
    ],
    projects:[{
      title: { type: String, default: '' },
      date: { type: Date, default: null },
      description: { type: String, default: '' },
      repoLink: { type: String, default: '' },
      cloneLink: { type: String, default: '' },
      starts: { type: Number, default: 0 },
      forks: { type: Number, default: 0 },
      updatedOn: { type: Date, default: null },
  }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('CreatorProfile', creatorProfileSchema);
