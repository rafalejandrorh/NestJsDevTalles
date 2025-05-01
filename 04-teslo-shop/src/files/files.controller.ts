import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    // const { file } = req;  
    //return this.filesService.create(createFileDto);
    return file;
  }

}
