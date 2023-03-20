import { awsConfig } from "../../configuration/configuration";
import { AWSError, S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: awsConfig.region,
});

const bucketName = awsConfig.bucketName;

export const uploadFile = async (file: File, fileName: string, folder: string, type: string): Promise<S3.ManagedUpload.SendData> => {
  const params: S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: `${folder}/${fileName}`,
    Body: file,
    ContentType: type,
    ACL: "public-read",
  };

  return s3.upload(params).promise();
};

export const uploadImage = (file: File, fileName: string, folder: string): Promise<S3.ManagedUpload.SendData> => {
  return uploadFile(file, fileName, folder, "image/jpeg");
};

export const uploadMp3 = (file: File, fileName: string, folder: string): Promise<S3.ManagedUpload.SendData> => {
  return uploadFile(file, fileName, folder, "audio/mpeg");
};

export const retrieveFileUrl = (fileName: string, folder: string): Promise<string> => {
  const params: S3.GetObjectRequest = {
    Bucket: bucketName,
    Key: `${folder}/${fileName}`
  };

  return s3.getSignedUrlPromise("getObject", params);
};

export const retrieveFile = (fileName: string, folder: string): Promise<S3.GetObjectOutput> => {
  const params: S3.GetObjectRequest = {
    Bucket: bucketName,
    Key: `${folder}/${fileName}`,
  };

  return s3.getObject(params).promise();
};

export const checkIfFileExists = async (fileName: string, folder: string): Promise<boolean> => {
  const params: S3.HeadObjectRequest = {
    Bucket: bucketName,
    Key: `${folder}/${fileName}`,
  };

  try {
    const response = await s3.headObject(params).promise();
    return (response.ContentLength ?? 0) > 0;
  } catch (error) {
    if ((error as AWSError).code === "NotFound") {
      return false;
    } else {
      throw error;
    }
  }
};

export const listBucketContents = (folder = ""): Promise<S3.ListObjectsV2Output> => {
  const params: S3.ListObjectsV2Request = {
    Bucket: bucketName,
    Prefix: folder,
    Delimiter: "/",
  };

  return s3.listObjectsV2(params).promise();
};

export const deleteFile = (fileName: string, folder: string): Promise<S3.DeleteObjectOutput> => {
  const params: S3.DeleteObjectRequest = {
    Bucket: bucketName,
    Key: `${folder}/${fileName}`,
  };

  return s3.deleteObject(params).promise();
};
