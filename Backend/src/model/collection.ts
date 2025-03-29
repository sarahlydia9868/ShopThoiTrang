"use strict";
import { Schema, model } from "mongoose";

const collectionSchema = new Schema<CollectionModel>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Collection = model<CollectionModel>("Collection", collectionSchema);

export default Collection;
