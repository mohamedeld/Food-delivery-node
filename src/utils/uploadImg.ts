import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const multerOptions = () => {
  const storage = multer.memoryStorage();
  const multerFilter = function (
    request: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('upload only image') as any, false);
    }
  };
  const upload = multer({ storage, fileFilter: multerFilter });
  return upload;
};

export const uploadSingleImage = (fieldName: string) =>
  multerOptions().single(fieldName);

export const uploadMultipleImage = (arrayOfFields: string[]) =>
  multerOptions().fields(arrayOfFields as any);
