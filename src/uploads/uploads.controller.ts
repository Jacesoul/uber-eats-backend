import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}

/*
{
  fieldname: 'file',
  originalname: '\te�\fu\x0Bn \x03i�\x00s\x05a\x06u.png',
  encoding: '7bit',
  mimetype: 'image/png',
  buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 04 38 00 00 04 38 08 06 00 00 00 ec 10 6c 8f 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 20 00 ... 1461827 more bytes>,
  size: 1461877
}
*/
