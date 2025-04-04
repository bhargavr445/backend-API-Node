const mongoose = require('mongoose');
const validator = require('validator');
const { atlasMongoConnection } = require('../db/mongoose');

// 1. Define the schema
const udemyCourseSchema = new mongoose.Schema({
  course_id: { 
    type: String, 
    required: true, 
    trim: true, 
    unique: true 
  },
  createrId: { 
    type: String, 
    ref: 'User' 
  },
  title: { 
    type: String 
  },
  description: { 
    type: String 
  },
  price: { 
    type: Number 
  },
  categoryType: { 
    type: String 
  }
}, {
  timestamps: true,  // ✅ Adds createdAt and updatedAt automatically
  collection: 'courses' // ✅ Bind this schema to the 'courses' collection
});

// 2. Create the model
const UdemyCourseM = atlasMongoConnection.model('UdemyCourseM', udemyCourseSchema);

module.exports = UdemyCourseM;