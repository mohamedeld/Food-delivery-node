import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
