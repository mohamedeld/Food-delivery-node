import mongoose from 'mongoose';

const resturantSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

const Resturnat = mongoose.model('City', resturantSchema);
export default Resturnat;
