
import {MediaFile} from "../Thumbnails"
export const generateFilesFromUrl = async (urls: string[]) => {
    const newFiles = urls.map(async (url) => {
      const urlParams = url.split("/");
      const fileName = urlParams[urlParams.length - 1];
      const lastModified = new Date().getMilliseconds();
      const file = await fetch(url);
      const fileBlob = await file.blob();
      const result: MediaFile = {
        ...fileBlob,
        lastModified: lastModified,
        name: fileName,
        webkitRelativePath: url,
        preview: url,
      };
      return result;
    });
    const result = await Promise.all(newFiles);
    return result;
  };