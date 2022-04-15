import { createPortal } from "react-dom"

const PopUpBg = ({
  children,
  fullViewport = false,
  onClick,
  className,
}: {
  children: JSX.Element;
  fullViewport?: boolean;
  onClick?: (e: React.MouseEvent<(HTMLButtonElement | HTMLDivElement)>) => void;
  className?: string;
}): JSX.Element => {
  return (
    <>
      {fullViewport &&
        createPortal(
          <div
            style={{cursor: "auto"}}
            aria-label={onClick ? "close pop up" : undefined}
            data-action-type={"close-pop-up"}
            role={onClick ? "button" : undefined}
            onClick={onClick}
            className={`pop-up-full-viewport ${className}`}
            tabIndex={onClick ? 0: -1}
          >
            <div className="pop-up-inner-container">{children}</div>
          </div>,
          document.body
        )}
      {!fullViewport && (
        <div
          className={`pop-up-fill-container ${className}`}
          aria-label={onClick ? "close pop up" : undefined}
          data-action-type={"close-pop-up"}
          role={onClick ? "button" : undefined}
          onClick={onClick}
          tabIndex={onClick ? -1 : 0}
        >
          <div className="pop-up-inner-container">{children}</div>
        </div>
      )}
    </>
  );
};
export default PopUpBg