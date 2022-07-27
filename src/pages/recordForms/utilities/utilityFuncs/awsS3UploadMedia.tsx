import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { AWSCredentialsObj } from "../../../../realm/RealmApp";
import { MediaFile } from "../../../utilityComponents/formInputs/Thumbnails";
import { v4 as uuidv4 } from "uuid";
import { replaceSpacesWithDash } from "../../../../helperFunctions/replaceSpacesWithDash";
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
}): Promise<string[]> => {
  if (!credentials) return [];
  if(files.length<=0) return [];
  const identityCreds = credentials;
  const client = new S3Client({
    region: process.env["REACT_APP_AWS_S3_REGION"],
    credentials: {
      accessKeyId: identityCreds.AccessKeyId,
      secretAccessKey: identityCreds.SecretKey,
      sessionToken: identityCreds.SessionToken
    },
  });
  const filePaths: string[] = [];
  const fileUploadPromises = files.map((file) => {
    const fileNameArr = file.name.split(".");
    const extension = fileNameArr[fileNameArr.length - 1];
    const key = `${replaceSpacesWithDash(recordType)}/${recordTitle}/${uuidv4()}.${extension}`;
    filePaths.push(key);
    const payload = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: key,
      Body: file,
    };
    const command = new PutObjectCommand(payload);
    const fileResponse = client.send(command);
    return fileResponse;
  });
  try {
    const response = await Promise.all(fileUploadPromises);
    console.log(response)
    if (response.every((r) => r.$metadata.httpStatusCode === 200))
      return filePaths;
    else throw response;
  } catch (e) {
    const error = new Error();
    error.stack = JSON.stringify(e);
    error.message = "Could not upload media files to S3"
    throw error
  }
};
export default awsS3UploadMedia;
