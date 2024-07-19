import React, { useState } from "react";
import Datepicker from "react-datepicker";
import { ReactSVG } from "react-svg";
import { createApolloClient } from "../../../apollo/client";
import { SET_TASKS_DUE_DATE } from "../../../apollo/mutations/setTasksDueDate";
import "react-datepicker/dist/react-datepicker.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePicker = ({
  id,
  isDatePickerOpen,
  setDate,
  handleToggleDatePicker,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const { createClient } = createApolloClient();

  const handleChange = (date) => {
    setStartDate(date);
  };

  const setTasksDueDate = async () => {
    handleCancel();
    const client = await createClient();
    try {
      const { data } = await client.mutate({
        mutation: SET_TASKS_DUE_DATE,
        variables: {
          id: id,
          due_at: startDate.toISOString(),
        },
      });
      const date = data.update_tasks_by_pk.due_at;
    } catch (error) {
      throw new Error("Error set due date");
    }
  };

  const handleSubmit = () => {
    setTasksDueDate();
    setDate(
      `${startDate.toLocaleString("default", {
        month: "short",
      })} ${startDate.getDate()}`
    );
  };

  const handleCancel = () => {
    handleToggleDatePicker(!isDatePickerOpen);
  };

  return (
    <div
      tabIndex={0}
      className="absolute top-full translate-y-1 transition-all flex-col origin-top end-0 py-4 px-6 min-w-full bg-white h-[380px] shadow shadow-[#D9D9D9] rounded-lg date-picker z-[1]"
    >
      <div className="border-b border-b-mint">
        <Datepicker
          inline
          onChange={handleChange}
          formatWeekDay={(day) => day.slice(0, 3)}
          dayClassName={(date) =>
            date.getMonth() !== startDate.getMonth() ? "hidden" : ""
          }
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <ReactSVG src="/icons/arrow-left.svg"></ReactSVG>
              </button>
              <div className="text-xl font-medium text-darkgreen">
                <span>{months[date.getMonth()]}</span>{" "}
                <span>{date.getFullYear()}</span>
              </div>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <ReactSVG src="/icons/arrow-right.svg"></ReactSVG>
              </button>
            </div>
          )}
        />
      </div>
      <div className="flex justify-between items-center gap-3 font-medium">
        <button
          className="text-base text-darkgreen border border-darkgreen py-2 rounded-lg mt-8 grow"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button
          className="text-base text-white bg-darkgreen py-2 rounded-lg mt-8 grow"
          onClick={handleSubmit}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
export default DatePicker;
