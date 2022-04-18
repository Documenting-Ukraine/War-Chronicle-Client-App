/* similar to use-text-inputs
 * but this debounces updates to the redux store
 * Meant to make a history stack more accurate
 * Or for search queries
 * only local state and debounced func are exposed
 */
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { Dispatch } from "redux";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { RealmApp, useRealmApp } from "../realm/RealmApp";
interface DebounceReduxProps {
  reduxUpdateFunc: ({
    app,
    input,
  }: {
    app: RealmApp;
    input: { value: string };
  }) => AsyncThunkAction<any, any, any>;
  charLimit?: number;
  addedPayload?: Object;
}
const useReduxDebouncedTextInputs = ({
  reduxUpdateFunc,
  charLimit,
  addedPayload,
}: DebounceReduxProps): [
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  Object|undefined,
  (e: Object) => void
] => {
  const dispatch = useDispatch();
  const [localTextInput, setLocalTextInput] = useState("");
  const [addPayload, setAddedPayload] = useState(addedPayload);
  const app = useRealmApp();

  //updates redux text input
  const updateTextInput = (
    app: RealmApp,
    newInput: string | (Object & { value: string }),
    dispatch: Dispatch<any>,
    reduxUpdateFunc: ({
      app,
      input,
    }: {
      app: RealmApp;
      input: { value: string };
    }) => AsyncThunkAction<any, any, any>
  ) => {
    if (typeof newInput === "string")
      dispatch(reduxUpdateFunc({ app: app, input: { value: newInput } }));
    else dispatch(reduxUpdateFunc({ app: app, input: newInput }));
  };
  //we debounce redux update to prevent
  //expensive calls to local storage AND,
  //to maintain a more accurate history stack
  const debouncedUpdateTextInput = useMemo(
    () => debounce(updateTextInput, 1300),
    []
  );
  const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    if (charLimit && value.length > charLimit) return;
    setLocalTextInput(value);
    const reduxPayload = !addPayload
      ? value
      : { ...addPayload, value: value };
    debouncedUpdateTextInput(app, reduxPayload, dispatch, reduxUpdateFunc);
  };
 
  return [localTextInput, onTextInputChange, addPayload, setAddedPayload];
};
export default useReduxDebouncedTextInputs;
