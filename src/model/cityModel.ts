import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'active'
    },
  },
  { timestamps: true },
);

const City = mongoose.model('City', citySchema);
export default City;
