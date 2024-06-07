import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
