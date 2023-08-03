import mongoose from 'mongoose';

const resturantSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    city_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'City',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cuisines: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    delivery_time: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isClose: {
      type: Boolean,
      required: true,
      default: false,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    totalRating: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },
  },
  { timestamps: true },
);

const Resturnat = mongoose.model('Resturnat', resturantSchema);
export default Resturnat;
