const RecordContentListItem = ({
  heading,
  children,
  url,
}: {
  heading: string;
  children: string | JSX.Element;
  url?: string;
}) => {
  const namespace = "record-pg";
  return (
    <li>
      <div className={`${namespace}-content-list-item`}>
        <h4>{heading}</h4>
        {url ? (
          <a
            className={`${namespace}-content-list-link`}
            href={url}
            target={"_blank"}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        ) : (
          <div className={`${namespace}-content-list-item-body`}>
            {children}
          </div>
        )}
      </div>
    </li>
  );
};
export default RecordContentListItem;
