const IntroImage = ({
  heading,
  imgData,
  backgroundColors,
  children,
}: {
  heading: string;
  imgData: { link: string; description: string };
  backgroundColors: [string, string];
  children?: JSX.Element | string;
}) => {
  const namespace = "intro-image";
  const style = (
    <style>
      {`.${namespace}-header {
    background-color: ${backgroundColors[0]};
  }
  .${namespace}-img::before {
    position: absolute;
    content: "";
    background-color: ${backgroundColors[0]};
    height: 50%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .${namespace}-img::after {
    position: absolute;
    content: "";
    background-color: ${backgroundColors[1]};
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: 1;
  }
  .${namespace}-summary {
    background-color: ${backgroundColors[1]};
  }`}
    </style>
  );
  return (
    <>
      {style}
      <div className={`${namespace}-container`}>
        <h2 className={`${namespace}-header`}>{heading}</h2>
        <div className={`${namespace}-img`}>
          <img src={imgData.link} alt={imgData.description} />
        </div>
        {children && (
          <div className={`${namespace}-summary`}>
            <p>{children}</p>
          </div>
        )}
      </div>
    </>
  );
};
export default IntroImage;
