import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/helpers/fileFilter';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {

  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 }, // 1MB
    storage: diskStorage({
      destination: './static/uploads/products',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    })
  }))
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
      
    if(!file) throw new BadRequestException('Make sure that the file is an image');

    console.log(file);
    return {
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };

  }

}
