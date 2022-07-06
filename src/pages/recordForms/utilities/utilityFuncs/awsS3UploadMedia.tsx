import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { AWSCredentialsObj } from "../../../../realm/RealmApp";
import { MediaFile } from "../../../utilityComponents/formInputs/Thumbnails";
import { v4 as uuidv4 } from "uuid";
const awsS3UploadMedia = async ({
  recordType,
  files,
  credentials,
  recordTitle,
}: {
  recordType: string;
  files: MediaFile[];
  credentials: AWSCredentialsObj;
  recordTitle: string;
}): Promise<string[] > => {
  if (!credentials) return [];
  const identityCreds = credentials.awsIdentityCredentials.Credentials;
  const client = new S3Client({
    region: process.env["AWS_CLIENT_REGION"],
    credentials: {
      accessKeyId: identityCreds.AccessKeyId,
      secretAccessKey: identityCreds.SecretKey,
      sessionToken: identityCreds.SessionToken,
      expiration: new Date(identityCreds.Expiration),
    },
  });
  const filePaths: string[] = [];
  const fileUploadPromises = files.map(async (file) => {
    const fileNameArr = file.name.split(".");
    const extension = fileNameArr[fileNameArr.length - 1];
    const key = `${recordType}/${recordTitle}/${uuidv4()}.${extension}`;
    filePaths.push(key);
    const payload = {
      Bucket: process.env.AWS_RECORD_BUCKET,
      Key: key,
      Body: file.preview,
    };
    const command = new PutObjectCommand(payload);
    const fileResponse = client.send(command);
    return fileResponse;
  });
  try {
    const response = await Promise.all(fileUploadPromises);
    if (response.every((r) => r.$metadata.httpStatusCode === 200))
      return filePaths;
    else throw response;
  } catch (e) {
    const error = new Error();
    error.stack = JSON.stringify(e);
    throw {
      error: true,
      message: "Could not upload media files to S3",
      metadata: error,
    };
  }
};
export default awsS3UploadMedia;
