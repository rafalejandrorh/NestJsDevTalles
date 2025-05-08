
export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  } else {
    return callback(new Error('Invalid file type'), false);
  }

}