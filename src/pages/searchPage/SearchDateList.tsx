import { useCallback, useEffect, useState } from "react";
import FormDateInputs, {
  onDateChangeWrapper,
  transformDate,
  transformTime,
} from "../utilityComponents/formInputs/FormDateInputs";
import {
  isOption,
  Option,
  transformSingleList,
} from "../authPage/data/OccupationList";
import { v4 as uuid } from "uuid";
import { unstable_batchedUpdates } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import FormInputs from "../utilityComponents/formInputs/FormInputs";
import { addDays, isBefore, subDays } from "date-fns";
type DateInterval = {
  startDate: Date | string;
  endDate: Date | string;
};
const dateTypes = ["Datebase Creation Date", "Event/Published Date"] as const;

const SelectDate = ({
  index,
  dateType,
  onUpdateAction,
  onDeleteAction,
  dateOptions,
}: {
  dateOptions: Option[];
  index: number;
  dateType?: string;
  onUpdateAction: (e: {
    index: number;
    newDateType?: string;
    input?: DateInterval;
  }) => void;
  onDeleteAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const namespace = "search-page";
  const [dateStart, setDateStart] = useState<Date>(
    new Date("1970-01-01 00:00:00 UTC+00")
  );
  const [dateEnd, setDateEnd] = useState<Date>(new Date());
  const onStartDateDayChange = (value: string, currDate: Date) => {
    let newDate = new Date(`${value}T${transformTime(dateStart)}`);
    if (isBefore(newDate, currDate)) {
      if (isBefore(dateEnd, newDate)) {
        unstable_batchedUpdates(() => {
          setDateStart(newDate);
          setDateEnd(addDays(newDate, 1));
          onUpdateAction({
            index: index,
            input: { endDate: dateEnd, startDate: newDate.toString() },
          });
        });
      } else {
        setDateStart(newDate);
        onUpdateAction({
          index: index,
          input: { endDate: dateEnd, startDate: newDate.toString() },
        });
      }
    }
  };
  const onStartDateTimeChange = (value: string, currDate: Date) => {
    let newDate = new Date(`${transformDate(dateStart)}T${value}`);
    if (isBefore(newDate, currDate)) {
      if (isBefore(dateEnd, newDate)) {
        unstable_batchedUpdates(() => {
          setDateStart(newDate);
          setDateEnd(addDays(newDate, 1));
          onUpdateAction({
            index: index,
            input: { endDate: dateEnd, startDate: newDate.toString() },
          });
        });
      } else {
        setDateStart(newDate);
        onUpdateAction({
          index: index,
          input: { endDate: dateEnd, startDate: newDate.toString() },
        });
      }
    }
  };
  const onEndDateDayChange = (value: string, currDate: Date) => {
    let newDate = new Date(`${value}T${transformTime(dateEnd)}`);
    if (isBefore(newDate, currDate)) {
      if (isBefore(newDate, dateStart)) {
        unstable_batchedUpdates(() => {
          setDateStart(subDays(newDate, 1));
          setDateEnd(newDate);
          onUpdateAction({
            index: index,
            input: { endDate: newDate.toString(), startDate: dateStart },
          });
        });
      } else {
        setDateEnd(newDate);
        onUpdateAction({
          index: index,
          input: { endDate: newDate.toString(), startDate: dateStart },
        });
      }
    }
  };
  const onEndDateTimeChange = (value: string, currDate: Date) => {
    let newDate = new Date(`${transformDate(dateEnd)}T${value}`);
    if (isBefore(newDate, currDate)) {
      if (isBefore(newDate, dateStart)) {
        unstable_batchedUpdates(() => {
          setDateStart(subDays(newDate, 1));
          setDateEnd(newDate);
          onUpdateAction({
            index: index,
            input: { endDate: newDate.toString(), startDate: dateStart },
          });
        });
      } else {
        onUpdateAction({
          index: index,
          input: { endDate: newDate.toString(), startDate: dateStart },
        });
        setDateEnd(newDate);
      }
    }
  };
  const onEndDateControlledChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onDateChangeWrapper(e, onEndDateDayChange, onEndDateTimeChange);
  const onStartDateControlledChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => onDateChangeWrapper(e, onStartDateDayChange, onStartDateTimeChange);
  return (
    <>
      <div className={`${namespace}-date-rows`}>
        <FormInputs
          dropDown={dateOptions}
          name={"Type"}
          title={" "}
          required={false}
          customDropdownFunc={(e) => {
            if (isOption(e) && dateEnd && dateStart) {
              onUpdateAction({
                index: index,
                newDateType: e.value,
                input: { endDate: dateEnd, startDate: dateStart },
              });
            }
          }}
        />
        <FormDateInputs
          timeInput={false}
          name={"Start Date"}
          title={" "}
          required={false}
          controlledDate = {dateStart}
          onControlledChange = {onStartDateControlledChange}
        />
        <FormDateInputs
          timeInput={false}
          name={"End Date"}
          title={" "}
          required={false}
          controlledDate = {dateEnd}
          onControlledChange = {onEndDateControlledChange}
        />
        <button
          className="delete-date-query"
          data-date-type={dateType}
          data-search-idx={index}
          onClick={onDeleteAction}
          aria-label={"delete-date-query"}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </>
  );
};
const modifySearchQuery = ({
  dateQuery,
  key,
  type,
  input,
}: {
  dateQuery: { [key: string]: DateInterval };
  key?: string;
  type: "add" | "delete";
  input?: DateInterval;
}) => {
  const newState = { ...dateQuery };
  if (type === "delete" && key) delete newState[key];
  if (type === "add" && input && key) newState[key] = input;
  return newState;
};
export const SearchDateList = ({
  onChange,
}: {
  onChange: (e: { [key: string]: DateInterval }) => void;
}) => {
  const namespace = "search-page";
  const [dateQueriesTypes, setDateQueriesTypes] = useState<
    {
      _id: string;
      dateType?: string;
    }[]
  >([
    {
      _id: uuid(),
    },
  ]);
  const [dateQuery, setDateQuery] = useState<{ [key: string]: DateInterval }>(
    {}
  );

  useEffect(() => {
    if (onChange) onChange(dateQuery);
  }, [dateQuery, onChange]);

  const onDeleteAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataset = e.currentTarget.dataset;
    const dateType = dataset["dateType"];
    const searchIdx = dataset["searchIdx"];
    if (!searchIdx) return;
    const newDateTypes = [...dateQueriesTypes];
    newDateTypes.splice(parseInt(searchIdx), 1);
    if (!dateType) return setDateQueriesTypes(newDateTypes);
    const newQuery = modifySearchQuery({
      dateQuery: dateQuery,
      type: "delete",
      key: dateType,
    });
    unstable_batchedUpdates(() => {
      setDateQuery(newQuery);
      setDateQueriesTypes(newDateTypes);
    });
  };
  const onAddAction = () => {
    const newState = [...dateQueriesTypes];
    newState.push({
      _id: uuid(),
    });
    setDateQueriesTypes((state) => {
      if (state.length + 1 <= dateTypes.length) return newState;
      else return state;
    });
  };
  const onUpdateAction = ({
    dateQuery,
    queryTypes,
    index,
    newDateType,
    input,
  }: {
    dateQuery: { [key: string]: DateInterval };
    queryTypes: {
      _id: string;
      dateType?: string;
    }[];
    index: number;
    newDateType?: string;
    input?: DateInterval;
  }) => {
    const newState = [...queryTypes];
    if (newDateType) newState[index].dateType = newDateType;
    if (input) {
      const query = modifySearchQuery({
        dateQuery: dateQuery,
        type: "add",
        input: input,
        key: newState[index].dateType,
      });
      setDateQuery(query);
    }
  };
  const onUpdateActionCallback = useCallback(
    (e: { index: number; newDateType?: string; input?: DateInterval }) =>
      onUpdateAction({
        ...e,
        queryTypes: dateQueriesTypes,
        dateQuery: dateQuery,
      }),
    [dateQueriesTypes, dateQuery]
  );
  const dateInputs = transformSingleList([...dateTypes]);
  const currTypesUsed = dateQueriesTypes.map((el) => el.dateType);
  const options = dateInputs.filter((el) => !currTypesUsed.includes(el.value));
  return (
    <>
      <div className={`${namespace}-dates-header`}>
        <h4>Select Dates</h4>
        <button onClick={() => onAddAction()} aria-label={"add-date-query"}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Date Query</span>
        </button>
      </div>

      {dateQueriesTypes.map((el, idx) => {
        return (
          <SelectDate
            key={el._id}
            index={idx}
            dateType={el.dateType}
            onUpdateAction={onUpdateActionCallback}
            onDeleteAction={onDeleteAction}
            dateOptions={options}
          />
        );
      })}
    </>
  );
};
