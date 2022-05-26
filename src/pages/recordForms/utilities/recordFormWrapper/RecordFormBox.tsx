import { memo } from "react";
const RecordFormBox = ({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children: JSX.Element;
}) => {
  return (
    <div className={`record-form-box-container ${className}`}>
      <div className={`record-form-box-header ${className}-header`}>
        <h3>{title}</h3>
      </div>
      <div className={`record-form-box-body ${className}-body`}>{children}</div>
    </div>
  );
};
export default memo(RecordFormBox)