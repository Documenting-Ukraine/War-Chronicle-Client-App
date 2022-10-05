import { WarCrimes } from "../../../../types";
import {
  AttacksOnCivilians,
  DestructionOfCulture,
} from "../../../../types/dataTypes/docTypes/WarCrimes";
import RecordContentDataRow from "../../utilities/RecordContentDataRow";
import RecordContentListItem from "../../utilities/RecordContentListItem";
const AttacksOnCiviliansPage = ({ data }: { data: AttacksOnCivilians }) => {
  const munitionData = data.munition;
  return (
    <>
      <RecordContentDataRow heading="Munition">
        <div className="munition-data-container">
          <RecordContentDataRow heading="Munition Type">
            <>{munitionData.munition_type}</>
          </RecordContentDataRow>
          {munitionData.munition_sub_types && (
            <RecordContentDataRow heading="Munition Sub-Type">
              <>{munitionData.munition_sub_types}</>
            </RecordContentDataRow>
          )}
        </div>
      </RecordContentDataRow>
    </>
  );
};

const DestructionOfCulturePage = ({ data }: { data: DestructionOfCulture }) => {
  const { key_actor, objects_of_culture } = data;
  const { actor_name, actor_type } = key_actor;
  const { object_type, object_name, landmark } = objects_of_culture;
  return (
    <>
      <RecordContentDataRow heading="Key Actor:">
        <ul className="key-actor-data-container">
          <RecordContentListItem heading="Actor Type:">
            {actor_type}
          </RecordContentListItem>
          <RecordContentListItem heading="Actor Name:">
            {actor_name}
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Objects of Culture:">
        <ul className="objects-of-culture-container">
          <RecordContentListItem heading="Object Type:">
            {object_type}
          </RecordContentListItem>
          <RecordContentListItem heading="Object Name:">
            {object_name}
          </RecordContentListItem>
          {landmark && (
            <li className="landmark-data-container">
              <RecordContentDataRow heading="Landmark:">
                <ul>
                  <RecordContentListItem heading="Landmark Type:">
                    {landmark.landmark_type}
                  </RecordContentListItem>
                  <RecordContentListItem heading="Landmark Significance:">
                    {landmark.landmark_significance}
                  </RecordContentListItem>
                </ul>
              </RecordContentDataRow>
            </li>
          )}
        </ul>
      </RecordContentDataRow>
    </>
  );
};
const WarCrimesPage = ({ data }: { data: WarCrimes }) => {
  const { civilian_casualties } = data;
  let pageInputs = <></>;
  if (data.war_crime === "Attacks on Civilians")
    pageInputs = <AttacksOnCiviliansPage data={data} />;
  else if (data.war_crime === "Destruction of Culture")
    pageInputs = <DestructionOfCulturePage data={data} />;
  return (
    <>
      {civilian_casualties && (
        <RecordContentDataRow
          heading="Civilian Casualties"
          namespace="record-pg"
        >
          <>{civilian_casualties} </>
        </RecordContentDataRow>
      )}
      {pageInputs}
    </>
  );
};
export default WarCrimesPage;
