import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  name: string;
  password: string;
  email: string;
  age: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 10,
      max: 99,
    },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.pre('save', async function (this: UserDocument, next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
