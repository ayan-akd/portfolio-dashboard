import { TMessage } from "@/types/types";
import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema<TMessage>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const MessageModel =
  mongoose.models.Message || model<TMessage>("Message", messageSchema);
