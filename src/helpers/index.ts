import { MulterFile } from 'src/models/multerfile';

export const imageFileFilter = (
  req: Request,
  file: MulterFile,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
