import ExitIcon from "../exitIcon/ExitIcon"
interface FormErrBannerProps {
  formErr: {
    err: boolean;
    message: string | JSX.Element;
  };
  setFormErr: (e: {err: boolean, message: string}) => void;
}
const FormErrBanner = ({
    formErr, 
    setFormErr
}: FormErrBannerProps):JSX.Element => {
    return (
      <div id="form-err-banner" className="alert alert-danger">
        {formErr.message}
        <button
          aria-label="close banner"
                onClick={() => setFormErr({ err: false, message: "" }) }
        >
          <ExitIcon customStrokeWidth="0.5rem" />
        </button>
      </div>
    );
}
export default FormErrBanner