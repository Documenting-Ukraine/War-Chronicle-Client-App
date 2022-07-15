import {
  transformSingleList,
  transformOptions,
} from "../../../authPage/data/OccupationList";
import FormInputs, {
  CustomFormInputs,
} from "../../../utilityComponents/formInputs/FormInputs";
import { useEffect, useState } from "react";
import { Option, isOption } from "../../../authPage/data/OccupationList";
import { MultiValue } from "react-select";
import {
  isObjectOfCulture,
  KeyActor,
  LandmarkSignificance,
  LandmarksTypes,
  ObjectsOfCulture,
  WarCrimes,
} from "../../../../types/dataTypes/docTypes/WarCrimes";
import useRecordFormPropUpdate from "../../../../hooks/use-record-form-prop-update";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
const newObjectsOfCultureList = transformSingleList([...ObjectsOfCulture]);
const newLandmarkSignficance = transformSingleList([...LandmarkSignificance]);
const newLandmarkTypes = transformSingleList([...LandmarksTypes]);
const newKeyActors = transformSingleList([...KeyActor]);
const KeyActors = ({ defaultInputs }: { defaultInputs?: WarCrimes }) => {
  const destructionOfCultureType =
    defaultInputs && defaultInputs.war_crime === "Destruction of Culture";
  const [keyActorName, setKeyActorName] = useState(
    destructionOfCultureType && defaultInputs?.key_actor?.actor_name
      ? defaultInputs?.key_actor?.actor_name
      : ""
  );
  const [keyActorType, setKeyActorType] = useState<
    typeof KeyActor[number] | undefined
  >(
    destructionOfCultureType && defaultInputs?.key_actor?.actor_type
      ? defaultInputs?.key_actor?.actor_type
      : undefined
  );
  const updateStoreProps = useRecordFormPropUpdate("War Crimes");
  useEffect(() => {
    if (keyActorType)
      updateStoreProps({
        key_actor: {
          actor_name: keyActorName,
          actor_type: keyActorType,
        },
      });
  }, [keyActorName, keyActorType, updateStoreProps]);

  return (
    <>
      <FormInputs
        title="Key Actor Name"
        inputType="text"
        required
        className={"record-form-input"}
        name={"keyActorName"}
        defaultValue={
          destructionOfCultureType && defaultInputs?.key_actor?.actor_name
            ? defaultInputs?.key_actor?.actor_name
            : ""
        }
        customValidation={(e) => {
          setKeyActorName(e);
          return { err: false, message: "" };
        }}
      />
      <FormInputs
        title={"Key Actor Type"}
        name={"keyActorType"}
        dropDown={newKeyActors}
        className={"record-form-input"}
        defaultDropDownValue={
          destructionOfCultureType && defaultInputs?.key_actor?.actor_name
            ? transformOptions(defaultInputs?.key_actor?.actor_type)
            : undefined
        }
        customDropdownFunc={(e) => {
          if (isOption(e)) {
            const value = e.value;
            if (isItemInList<typeof KeyActor[number]>(value, KeyActor))
              setKeyActorType(value);
          }
        }}
        required
      />
    </>
  );
};
const ObjectsOfCultureInputs = ({
  defaultInputs,
}: {
  defaultInputs?: WarCrimes;
}) => {
  const destructionOfCultureType =
    defaultInputs && defaultInputs.war_crime === "Destruction of Culture";
  const updateStoreProps = useRecordFormPropUpdate("War Crimes");
  const [objectOfCulture, setObjectOfCulture] = useState<
    typeof ObjectsOfCulture[number] | undefined
  >(
    destructionOfCultureType
      ? defaultInputs?.objects_of_culture?.object_type
      : undefined
  );
  const [objectName, setObjectName] = useState(
    destructionOfCultureType && defaultInputs?.objects_of_culture?.object_name
      ? defaultInputs?.objects_of_culture?.object_name
      : ""
  );
  const [landmarkType, setLandmarkType] = useState<
    typeof LandmarksTypes[number] | undefined
  >(
    destructionOfCultureType
      ? defaultInputs?.objects_of_culture?.landmark?.landmark_type
      : undefined
  );
  const [landmarkSignificance, setLandmarkSignificance] = useState<
    typeof LandmarkSignificance[number] | undefined
  >(
    destructionOfCultureType
      ? defaultInputs?.objects_of_culture?.landmark?.landmark_significance
      : undefined
  );
  useEffect(() => {
    const landmarkProps = landmarkType
      ? {
          landmark_type: landmarkType,
          landmark_significance: landmarkSignificance
            ? landmarkSignificance
            : "",
        }
      : null;
    if (objectOfCulture)
      updateStoreProps({
        objects_of_culture: {
          object_type: objectOfCulture,
          object_name: objectName,
          landmark: landmarkProps ? landmarkProps : undefined,
        },
      });
  }, [
    updateStoreProps,
    objectOfCulture,
    objectName,
    landmarkType,
    landmarkSignificance,
  ]);
  return (
    <CustomFormInputs
      title="Object of Cultural Heritage"
      name={"objectOfHeritageCulture"}
      className={"record-form-input"}
      sectionContainer
      required={true}
    >
      <>
        <FormInputs
          title="Object Name"
          inputType="text"
          required={true}
          name={"objectOfCultureName"}
          customValidation={(e) => {
            setObjectName(e);
            return { err: false, message: "" };
          }}
          defaultValue={objectName}
        />
        <FormInputs
          title="Object Type"
          name={"objectType"}
          required={true}
          dropDown={newObjectsOfCultureList}
          defaultValue={objectOfCulture}
          customDropdownFunc={(e: Option | MultiValue<Option> | null) => {
            if (isOption(e)) {
              const value = e.value;
              if (isObjectOfCulture(value)) setObjectOfCulture(value);
            }
          }}
        />
        {objectOfCulture === "Landmark" && (
          <>
            <FormInputs
              title="Landmark Type"
              name={"landmarkType"}
              required={true}
              dropDown={newLandmarkTypes}
              defaultDropDownValue={
                landmarkType ? transformOptions(landmarkType) : undefined
              }
              customDropdownFunc={(e) => {
                if (isOption(e)) {
                  const value = e.value;
                  if (
                    isItemInList<typeof LandmarksTypes[number]>(
                      value,
                      LandmarksTypes
                    )
                  )
                    setLandmarkType(value);
                }
              }}
            />
            <FormInputs
              title="Landmark Significance"
              name={"landmarkSignificance"}
              dropDown={newLandmarkSignficance}
              required={true}
              defaultDropDownValue={
                landmarkSignificance
                  ? transformOptions(landmarkSignificance)
                  : undefined
              }
              customDropdownFunc={(e) => {
                if (isOption(e)) {
                  const value = e.value;
                  if (
                    isItemInList<typeof LandmarkSignificance[number]>(
                      value,
                      LandmarkSignificance
                    )
                  )
                    setLandmarkSignificance(value);
                }
              }}
            />
          </>
        )}
      </>
    </CustomFormInputs>
  );
};
const DestructionOfCulture = ({
  defaultInputs,
}: {
  defaultInputs?: WarCrimes;
}): JSX.Element => {
  return (
    <>
      <KeyActors defaultInputs={defaultInputs} />
      <ObjectsOfCultureInputs defaultInputs={defaultInputs} />
    </>
  );
};
export default DestructionOfCulture;
