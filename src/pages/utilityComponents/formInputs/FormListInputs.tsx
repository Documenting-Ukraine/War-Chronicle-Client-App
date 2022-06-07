import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Evidence,
  ArrayOneOrMore,
} from "../../../types/dataTypes/GeneralRecordType";
import FormInputs from "./FormInputs";
import { v4 as uuidv4 } from "uuid";
import useWindowWidth from "../../../hooks/use-window-width";
import removeAddedWhiteSpace from "../../../helperFunctions/removeWhiteSpace";
const isEvidence = (
  e: any[]
): e is ArrayOneOrMore<Evidence & { _id: string }> => {
  try {
    const greaterThanOne = e.length > 0;
    const objStructure =
      typeof e[0].description === "string" && typeof e[0].url === "string";
    return greaterThanOne && objStructure;
  } catch (e) {
    return false;
  }
};
type EvidenceItem = ArrayOneOrMore<Evidence & { _id: string }>;
const FormListInput = ({
  idx,
  onDeleteInput,
  customValidation,
}: {
  idx: number;
  onDeleteInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
  customValidation?: (e: string) => {
    err: boolean;
    message: string;
  };
}) => {
  const smallWidth = useWindowWidth(576);
  return (
    <div className="evidence-list-item">
      <div className="evidence-list-item-header">
        <h5>Evidence {idx + 1}</h5>
        <button
          data-evidence-idx={idx}
          aria-label={`delete-evidence-${idx}`}
          onClick={onDeleteInput}
        >
          {smallWidth && <span>Delete</span>}
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <FormInputs
        title={"Link"}
        name={`evidence-list-${idx}`}
        inputType="text"
        className="evidence-list-form-inputs"
        customValidation={customValidation}
        required
      />
      <FormInputs
        title={"Description"}
        name={`evidence-list-${idx}`}
        inputType="text"
        className="evidence-list-form-inputs"
        required={false}
      />
    </div>
  );
};
const FormListInputs = ({
  className,
  required = true,
}: {
  className?: string;
  required?: boolean;
}) => {
  const [inputs, setInputs] = useState<EvidenceItem>([
    {
      _id: uuidv4(),
      description: "",
      url: "",
    },
  ]);
  const [err, setErr] = useState({
    err: false,
    message: "",
  });
  const onAddNewInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs((state) => {
      const newItem = {
        _id: uuidv4(),
        description: "",
        url: "",
      };
      const newState = [...state, newItem];
      if (isEvidence(newState)) return newState;
      else return [newItem];
    });
  };
  const onDeleteInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const evidenceIdx = e.currentTarget.dataset["evidenceIdx"];
    setInputs((state) => {
      const copyState = [...state];
      if (evidenceIdx) copyState.splice(parseInt(evidenceIdx), 1);
      if (isEvidence(copyState)) return copyState;
      else
        return [
          {
            _id: uuidv4(),
            description: "",
            url: "",
          },
        ];
    });
  };
  return (
    <>
      <div className="d-flex flex-column w-100">
        <div
          className={`evidence-list-container ${className ? className : ""}`}
          style={err.err ? { border: "2px solid darkred" } : {}}
        >
          {inputs.map((input, idx) => {
            return (
              <FormListInput
                key={input._id}
                idx={idx}
                onDeleteInput={onDeleteInput}
                customValidation={required ? (str) => {
                  if (removeAddedWhiteSpace(str).length <= 0)
                    setErr({
                      err: true,
                      message: `Evidence ${idx + 1} does not have a link. All evidence items must have a link`,
                    });
                  else {
                    setErr({
                      err: false,
                      message: "",
                    });
                  }
                  return { err: false, message: "" };
                }: undefined}
              />
            );
          })}
          <button
            className={"add-evidence-btn"}
            onClick={onAddNewInput}
            aria-label={"add-new-evidence-item"}
          >
            <span>Add Evidence</span>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {err.err && (
          <div className="evidence-list-input-error">{err.message}</div>
        )}
      </div>
    </>
  );
};
export default FormListInputs;
