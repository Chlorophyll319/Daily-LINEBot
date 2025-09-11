import { model, Schema } from "mongoose";

// 定義資料庫的資料結構
const schema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "用戶ID是必填的"],
      trim: true,
      unique: true,
    },
    city: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("users", schema);
