import { Link } from "react-router-dom";
const contributorsData = [
  { name: "Rachel Amran", title: "Executive Committee Member" },
  { name: "Christopher Atwood", title: "Executive Committee Member" },
  { name: "Daniel Brennan", title: "Executive Committee Member" },
  { name: "Arky Asmal", title: "Principal Developer" },
];
function transformDataIntoRows<T>(arr: T[], itemPerRow: number) {
  const newArr = [];
  const copyArr = [...arr];
  while (copyArr.length >= itemPerRow)
    newArr.push(copyArr.splice(0, itemPerRow));
  //take care of leftovers
  if (copyArr.length > 0) newArr.push(copyArr);
  return newArr;
}
export const ContributorCard = ({
  name,
  title,
}: {
  name: string;
  title: string;
}) => {
  const namespace = "contributor-card";
  return (
    <div className={`${namespace}`}>
      <span className={`${namespace}-name`}>{name}</span>
      <span className={`${namespace}-title`}>{title}</span>
    </div>
  );
};
const AboutContributors = () => {
  const namespace = "about-pg";
  const transformData = transformDataIntoRows(contributorsData, 2);
  return (
    <div id={`${namespace}-contributors-container`}>
      <h3>Contributors</h3>
      <div id={`${namespace}-contributors`}>
        {transformData.map((row, idx) => {
          return (
            <div key={idx} className="contributor-row">
              {row.map((contributor) => (
                <ContributorCard
                  key={contributor.name}
                  name={contributor.name}
                  title={contributor.title}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div id={`${namespace}-action`}>
        <h4>Want to contribute?</h4>
        <Link to="/forms/join">Apply Now</Link>
      </div>
    </div>
  );
};
export default AboutContributors;
