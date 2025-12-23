import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

userSchema.plugin(mongooseAggregatePaginate);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if password is not modified then proceed
  //to next middleware

  this.password = await bcrypt.hash(this.password, 10); //if modified or new, hash it.
  next();
});

export const User = mongoose.model("User", userSchema);
