import { model, Schema } from "mongoose";
import { CategoryModel } from "./CategoryModel";

const EventsSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 150,
      required: true,
    },
    description: {
      type: String,
      minlength: 20,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "la capacidad debe ser un numero entero",
      },
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "finished"],
      default: "scheduled",
    },
    location: {
      venue: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
      },
      address: {
        type: String,
        minlength: 5,
        maxlength: 150,
        required: true,
      },
      city: { type: String, minlength: 2, maxlength: 50, required: true },
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const EventModule = model("Event", EventsSchema);
