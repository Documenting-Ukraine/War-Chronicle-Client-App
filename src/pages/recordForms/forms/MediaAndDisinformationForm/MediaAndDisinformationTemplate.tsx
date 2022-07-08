import { MediaType } from "../../../../types/dataTypes/docTypes/MediaAndDisinformation"

const MediaAndDisinformationTemplate = ({
    mediaType,
    children,
    mediaTypeEl,
    mediaTypeOtherEl
}:{
    mediaType: typeof MediaType[number] | undefined
    children: JSX.Element,
    mediaTypeEl?: JSX.Element,
    mediaTypeOtherEl?: JSX.Element
}) => {
    return(
        <>
        {mediaTypeEl}
        {mediaType === "Other" && mediaTypeOtherEl}
            {children}
        </>
    )
}
export default MediaAndDisinformationTemplate