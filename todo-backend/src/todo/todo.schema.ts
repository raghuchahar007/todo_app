import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  isDeleted: { type: Boolean, default: false },
});

export interface Todo extends mongoose.Document {
  title: string;
  description: string;
  completed: boolean;
  isDeleted: boolean;
}
