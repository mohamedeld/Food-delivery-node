import { Router } from 'express';
import BannerController from '../controller/bannerController';
import checkValidator from '../middleware/checkValidator.middleware';
import {
  createBanner,
  getBanner,
  updateBanner,
  deleteBanner,
} from '../middleware/validator/bannerValidator';
class BrannerRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.postRoutes();
    this.getRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
    this.router.route('/').get(checkValidator, BannerController.getBanners);
    this.router
      .route('/:id')
      .get(getBanner, checkValidator, BannerController.getBanner);
  }
  postRoutes() {
    this.router
      .route('/')
      .post(
        BannerController.uploadBannerImage,
        BannerController.resizeImage,
        createBanner,
        checkValidator,
        BannerController.createBanner,
      );
  }
  putRoutes() {}
  patchRoutes() {
    this.router
      .route('/:id')
      .patch(updateBanner, checkValidator, BannerController.updateBanner);
  }
  deleteRoutes() {
    this.router
      .route('/:id')
      .delete(deleteBanner, checkValidator, BannerController.deleteBanner);
  }
}

export default new BrannerRouter().router;
