import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from 'src/common/helpers';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {

  private applicationHost: string;

  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {
    this.applicationHost = this.configService.getOrThrow<string>('application.host');
  }

  @Get('product/:imageName')
  findProductImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const path = this.filesService.getStaticProductImage(imageName);
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 }, // 1MB
    storage: diskStorage({
      destination: './static/uploads/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
      
    if(!file) throw new BadRequestException('Make sure that the file is an image');

    const secureUrl = `${this.applicationHost}/files/product/${file.filename}`;

    return {
      fileName: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      secureUrl: secureUrl
    };

  }

}
