const PageWrapper = ({
  heading,
  icon,
  children,
  limitWidth = true,
  padding = true,
}: {
  heading?: string;
  icon?: JSX.Element;
  children: JSX.Element;
  limitWidth?: boolean;
  padding?: boolean;
}) => {
  const namespace = "page-wrapper";
  return (
    <div
      className={`${namespace}-pg`}
      style={padding ? { padding: "2rem 7%" } : {padding: "2rem 0"}}
    >
      <div
        className={`${namespace}-pg-container`}
        style={limitWidth ? { maxWidth: "1200px" } : {}}
      >
        <div
          className={`${namespace}-pg-header`}
          style={padding ? {} : { paddingRight: "7%", paddingLeft: "7%" }}
        >
          {icon}
          <h1>{heading}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};
export default PageWrapper;
