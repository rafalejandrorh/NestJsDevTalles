import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

  getStaticProductImage(imageName: string) {

    const path = join(__dirname, '../../static/uploads/products', imageName);
    const fileExists = existsSync(path);

    if(!fileExists) throw new BadRequestException(`No product found with image ${imageName}`);
    return path;
  }

}
