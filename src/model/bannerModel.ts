import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
