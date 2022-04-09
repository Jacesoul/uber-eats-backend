import {
  Controller,
  Injectable,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Injectable()
@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    try {
      /*
      const upload = await new AWS.S3()
        .createBucket({
          Bucket: '',
        })
        .promise();
        */
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: process.env.BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (e) {
      console.log(e);
      return null;
    }
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
