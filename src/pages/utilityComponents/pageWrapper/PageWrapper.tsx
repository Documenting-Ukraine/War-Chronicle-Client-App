const PageWrapper = ({
    heading,
    icon,
    children
}:{
    heading?: string; 
    icon?: JSX.Element;
    children: JSX.Element
}) => {
    const namespace = "page-wrapper"
  return (
    <div className={`${namespace}-pg`}>
      <div className={`${namespace}-pg-container`}>
        <div className={`${namespace}-pg-header`}>
          {icon}
          <h1>{heading}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};
export default PageWrapper;
