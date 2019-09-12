import AWS from 'aws-sdk';
import { BUCKET, UPLOAD_LINK_DURATION } from './config';

const s3 = new AWS.S3({ signatureVersion: 'v4' });

const requiredParameter = (name) => {
  throw new Error(`Missing required parameter ${name}.`);
};

export class FileService {
  constructor(bucket = BUCKET, defaultExpiration = UPLOAD_LINK_DURATION) {
    this.bucket = bucket;
    this.defaultExpiration = defaultExpiration;
  }

  createOrUpdate(
    filePath = requiredParameter('filePath'),
    uploadExpirationSeconds = this.defaultExpiration,
  ) {
    const params = {
      ACL: 'public-read',
      Bucket: this.bucket,
      Key: filePath,
      Expires: uploadExpirationSeconds,
    };

    return new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) reject(err);
        else resolve(url);
      });
    });
  }
}

export default new FileService();
