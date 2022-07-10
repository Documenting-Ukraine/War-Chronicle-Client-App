import { useState, createContext, useContext } from "react";
import { MediaFile } from "../Thumbnails";

interface DropZoneProviderProps {
  newImages: MediaFile[];
  newVideos: MediaFile[];
  storedImages: string[];
  storedVideos: string[];
  setStoredImages: React.Dispatch<React.SetStateAction<string[]>>
  setStoredVideos: React.Dispatch<React.SetStateAction<string[]>>
  setNewImages: React.Dispatch<React.SetStateAction<MediaFile[]>>;
  setNewVideos: React.Dispatch<React.SetStateAction<MediaFile[]>>
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
  storedMedia,
  children,
}: {
  storedMedia?: {
    images?: string[];
    videos?: string[]
  };
  children: JSX.Element;
}) => {
  const [newImages, setNewImages] = useState<MediaFile[]>([])
  const [newVideos, setNewVideos] = useState<MediaFile[]>([])
  const [storedImages, setStoredImages] = useState<string[]>(storedMedia?.images ? storedMedia.images : [])
  const [storedVideos, setStoredVideos] = useState<string[]>(storedMedia?.videos ? storedMedia.videos: [])
  const wrapped = {
    newImages,
    newVideos,
    storedImages, 
    setStoredImages,
    storedVideos, 
    setStoredVideos,
    setNewImages,
    setNewVideos,
  }
  return (
    <DropZoneFileContext.Provider value={wrapped}>
      {children}
    </DropZoneFileContext.Provider>
  );
};
