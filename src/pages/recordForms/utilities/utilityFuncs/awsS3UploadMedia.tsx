import { MediaFile, MediaLink } from "../../../utilityComponents/formInputs/Thumbnails";
import axios from "axios";
import {v4 as uuid} from "uuid";
const mediaFileDomain = `https://${process.env.REACT_APP_MEDIA_FILES_DOMAIN}`;
const awsS3UploadMedia = async ({
  recordType,
  files,
  realmToken,
  recordTitle,
  mediaType
}: {
  mediaType: "image" | 'video';
  recordType: string;
  files: MediaFile[];
  realmToken: string; 
  recordTitle: string;
}): Promise<{uploaded: MediaLink[], failed?: MediaLink[]}> => {
  if (files.length <= 0) return {uploaded: []};
  const fileNames = files.map((file) => {
    return{
      name: file.name,
      type: file.type,
      size: file.size,
    }
  })
  //generate map for O(1) look up
  const filesMap: {[key: string]: MediaFile} = {}
  for(let file of files) filesMap[file.name] = file
  const {data: fetchSignedUrls} = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_ENDPOINT}/upload_record_media`,
    data: {
      token: realmToken,
      recordType: recordType,
      files: fileNames,
      recordTitle: recordTitle,
    }
  })
  if(!Array.isArray(fetchSignedUrls)) return  {uploaded: []}
  const uploadToS3 = fetchSignedUrls.map((data) =>{
    const {name, signedUrl} = data
    const file = filesMap[name]
    const upload: any = axios({
      method: "PUT",
      url: signedUrl,
      data: file,
      headers:{
        'Content-Type': filesMap[name].type
      }
    })
    return upload
  })
  try {
    const response = await Promise.all(uploadToS3);
    const uploadedKeys:MediaLink[] = []
    const failedKeys: MediaLink[] = []
    if (response.every((r, idx) => {
      if(r.status === 200) uploadedKeys.push({
        id: uuid(),
        url: `${mediaFileDomain}/${fetchSignedUrls[idx].key}`,
        mediaType: mediaType,
      })
      else failedKeys.push({
        id: uuid(),
        url: `${mediaFileDomain}/${fetchSignedUrls[idx].name}`,
        mediaType: mediaType,
      })
      return r.statusCode === 200
    }))
      return {uploaded: uploadedKeys};
    else return {uploaded: uploadedKeys, failed: failedKeys};
  } catch (e) {
    const error = new Error();
    error.stack = JSON.stringify(e);
    error.message = "Could not upload all media files to S3";
    throw error;
  }
};
export default awsS3UploadMedia;
