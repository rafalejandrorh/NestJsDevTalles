import { BadRequestException, Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/helpers/fileFilter';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
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

}
