import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useEffect, useState } from "react";

export const SelectDateCakra = ({ fetchTotalSoldByDate }) => {
  // Mendapatkan tanggal saat ini
  const currentDate = new Date();

  // Mengatur default state dateFrom dan dateTo dengan salinan objek Date
  const [dateFrom, setDateFrom] = useState(currentDate);
  const [dateTo, setDateTo] = useState(currentDate);

  useEffect(() => {
    const formattedDateFrom = dateFrom.toISOString().split("T")[0];
    const formattedDateTo = dateTo.toISOString().split("T")[0];
    fetchTotalSoldByDate(formattedDateFrom, formattedDateTo);
  }, [dateFrom, dateTo]);

  return (
    <>
      <div>
        <span>dateFrom</span>

        <span className="md: ml-44">dateTo</span>
      </div>

      <div className="flex">
        <SingleDatepicker
          name="date-input"
          date={dateTo}
          onDateChange={setDateTo}
        />
        <div className="w-4"></div>
        <SingleDatepicker
          name="date-input"
          date={dateFrom}
          onDateChange={setDateFrom}
        />
      </div>
    </>
  );
};
