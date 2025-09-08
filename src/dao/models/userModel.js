import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Formato de email inválido"] 
    },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    }
  },
  { 
    timestamps: true
  }
);

// Compilar con condicional
const UserModel = mongoose.models[userCollection] || mongoose.model(userCollection, userSchema);

export default UserModel;
