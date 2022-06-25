import { useState, createContext, useContext } from "react";
import { MediaFile } from "../Thumbnails";

interface DropZoneProviderProps {
  images: MediaFile[];
  videos: MediaFile[];
  setImages: React.Dispatch<React.SetStateAction<MediaFile[]>>;
  setVideos: React.Dispatch<React.SetStateAction<MediaFile[]>>
}

const DropZoneFileContext = createContext<DropZoneProviderProps | null>(null);
export const useDropZoneProvider = () => {
  const context = useContext(DropZoneFileContext)
  if(!context)throw new Error(
    `You must call useDropZoneProvider inside of a DropZoneProvider`
  );
  return context
}
export const DropZoneProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [images, setImages] = useState<MediaFile[]>([])
  const [videos, setVideos] = useState<MediaFile[]>([])
  const wrapped = {
    images,
    videos,
    setImages,
    setVideos,
  }
  return (
    <DropZoneFileContext.Provider value={wrapped}>
      {children}
    </DropZoneFileContext.Provider>
  );
};
