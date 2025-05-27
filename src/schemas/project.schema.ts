import { TProject } from "@/types/types";
import mongoose, { model, Schema } from "mongoose";

const projectSchema = new Schema<TProject>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  clientRepo: {
    type: String,
    required: true,
  },
  serverRepo: {
    type: String,
  },
  technology: {
    type: [String],
    required: true,
  },
  liveLink: {
    type: String,
    required: true,
  },
});

export const ProjectModel =
  mongoose.models.Project || model<TProject>("Project", projectSchema);
