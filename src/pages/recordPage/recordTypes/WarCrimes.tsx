import { WarCrimes } from "../../../types";
import {
  AttacksOnCivilians,
  DestructionOfCulture,
} from "../../../types/dataTypes/docTypes/WarCrimes";
import RecordContentDataRow from "../utilities/RecordContentDataRow";
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
      <RecordContentDataRow heading="Key Actor">
        <div className="key-actor-data-container">
          <RecordContentDataRow heading="Actor Type">
            <>{actor_type}</>
          </RecordContentDataRow>
          <RecordContentDataRow heading="Actor Name">
            <>{actor_name}</>
          </RecordContentDataRow>
        </div>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Objects of Culture">
        <div className="objects-of-culture-container">
          <RecordContentDataRow heading="Object Type">
            <>{object_type}</>
          </RecordContentDataRow>
          <RecordContentDataRow heading="Object Name">
            <>{object_name}</>
          </RecordContentDataRow>
          {landmark && (
            <RecordContentDataRow heading="Landmark">
              <div className="landmark-data-container">
                <RecordContentDataRow heading="Landmark Type">
                  <>{landmark.landmark_type}</>
                </RecordContentDataRow>
                <RecordContentDataRow heading="Landmark Significance">
                  <>{landmark.landmark_significance} </>
                </RecordContentDataRow>
              </div>
            </RecordContentDataRow>
          )}
        </div>
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
