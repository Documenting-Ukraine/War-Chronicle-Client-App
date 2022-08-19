import { MediaFile } from "../../../utilityComponents/formInputs/Thumbnails";
import axios from "axios";

const awsS3UploadMedia = async ({
  recordType,
  files,
  realmToken,
  recordTitle
}: {
  recordType: string;
  files: MediaFile[];
  realmToken: string; 
  recordTitle: string;
}): Promise<{uploaded: string[], failed?: string[]}> => {
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
    url: `${process.env.REACT_APP_API_ENDPOINT}/media/fetch_signed_urls`,
    data: JSON.stringify({
      token: realmToken,
      recordType: recordType,
      files: fileNames,
      recordTitle: recordTitle,
    })
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
    const uploadedKeys:string[] = []
    const failedKeys: string[] = []
    if (response.every((r, idx) => {
      if(r.status === 200) uploadedKeys.push(fetchSignedUrls[idx].key)
      else failedKeys.push(fetchSignedUrls[idx].name)
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
