import { createPortal } from "react-dom"

const PopUpBg = ({
    children,
    fullViewport = false, 
    onClick,
    className
}: {
    children: JSX.Element,
    fullViewport?: boolean,
    onClick?: () => void,
    className?: string
}): JSX.Element => {
    return (
      <>
        {fullViewport &&
          createPortal(
            <div
                  aria-label={onClick ? "close pop up" : undefined}
                  role={onClick ? "button" : undefined}
                  onClick={onClick}
                  className={`pop-up-full-viewport ${className}`}
            >
              <div className="pop-up-inner-container">{children}</div>
            </div>,
            document.body
          )}
        {!fullViewport && (
          <div
            className={`pop-up-fill-container ${className}`}
            aria-label={onClick ? "close pop up" : undefined}
            role={onClick ? "button" : undefined}
            onClick={onClick}
          >
            <div className="pop-up-inner-container">{children}</div>
          </div>
        )}
      </>
    );
}
export default PopUpBg