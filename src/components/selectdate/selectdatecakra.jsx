import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useState } from "react";

export const SelectDateCakra = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className="flex ">
        <SingleDatepicker
          name="date-input"
          date={date}
          onDateChange={setDate}
        />
        <div className="w-4"></div>
        <SingleDatepicker
          name="date-input"
          date={date}
          onDateChange={setDate}
        />
      </div>
    </>
  );
};
