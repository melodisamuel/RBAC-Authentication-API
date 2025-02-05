const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Shipper", "Carrier"],
    default: "Shipper",
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  // RUn this function only if password was modified
  if (!this.isModified("password")) return next();
  try{
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
  } catch (err) {
    next(err);
  }
});


UserSchema.methods.correctPassword =async function (candidatePassword, userPassword) { 
    return await bcrypt.compare(candidatePassword, userPassword);

}

module.exports = mongoose.model("User", UserSchema);
