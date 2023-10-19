const mongoose = require("mongoose");

const RoboSoccerSchema = new mongoose.Schema({
  Team_name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true
  },
});

const BGMISchema = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true
  },
  Leader_email: {
    type: String,
    required: true,
    trim: true
  },
  Leader_college: {
    type: String,
    required: true,
    trim: true
  },
  Leader_Game_Name: {
    type: String,
    required: true,
    trim: true
  },
  Leader_id: {
    type: String,
    required: true,
    trim: true
  },
  P2_name: {
    type: String,
    trim: true
  },
  P2_id: {
    type: String,
    trim: true
  },
  P2_number: {
    type: String,
    trim: true
  },
  P3_name: {
    type: String,
    trim: true
  },
  P3_id: {
    type: String,
    trim: true
  },
  P3_number: {
    type: String,
    trim: true
  },
  P4_name: {
    type: String,
    trim: true
  },
  P4_id: {
    type: String,
    trim: true
  },
  P4_number: {
    type: String,
    trim: true
  },
  P5_name: {
    type: String,
    trim: true
  },
  P5_id: {
    type: String,
    trim: true
  },
  P5_number: {
    type: String,
    trim: true
  },
  payment: {
    type: String,
    required: true,
  },
})

const AEROFILIA = new mongoose.Schema({
  Team_key: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Team_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_name: {
    type: String,
    required: true,
    trim: true,
  },
  Leader_email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Leader_whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Leader_college: {
    type: String,
    required: true,
    trim: true
  },
  Leader_branch: {
    type: String,
    required: true,
    trim: true
  },
  Leader_yog: {
    type: String,
    required: true,
    trim: true
  },
  P2_name: {
    type: String,
    required: true,
    trim: true,
  },
  P3_name: {
    type: String,
    trim: true,
  },
})

const LogoDesign = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Whatsapp: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  College: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Branch: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  Year: {
    type: String,
    required: true,
    trim: true
  },
  Roll_Number: {
    type: String,
    required: true,
    trim: true
  },
  Software_Used: {
    type: String,
    required: true,
    trim: true,
  },
  Prior_Experience: {
    type: String,
    trim: true,
  },
})

const RoboSoccerModel = mongoose.model("RoboSoccer", RoboSoccerSchema, "RoboSoccer_registration");
const BGMIModel = mongoose.model("BGMI", BGMISchema, "BGMI_registration");
const AerofiliaModel = mongoose.model("Aerofilia", AEROFILIA, "Aerofilia_registration");
const LogoDesignModel = mongoose.model("LogoDesign", LogoDesign, "LogoDesign_registration");

module.exports = { RoboSoccerModel, BGMIModel, AerofiliaModel, LogoDesignModel };