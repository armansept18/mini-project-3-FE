import { useEffect, useState } from "react";
import { TableSalesReport } from "../../components/tablesalesreport/tablesalesreport";
import { NavTemplateAdmin } from "../../components/template/template";
import api from "../../api/api";
import { Spinner } from "@chakra-ui/spinner";

export const SalesReportPage = () => {
  const [transaction, setTransaction] = useState([]);
  const [sortOrder, setSortOrder] = useState({ sortby: "asc" });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransaction = () => {
    setIsLoading(true);
    setTimeout(() => {
      api
        .get("/transactions", { params: { sortby: sortOrder.sortby } })
        .then((result) => {
          setTransaction(result.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err?.message);
          setIsLoading(false);
        });
    }, [500]);
  };
  console.log(transaction);

  useEffect(() => {
    fetchTransaction();
  }, []);
  return (
    <>
      <NavTemplateAdmin>
        <div className="flex justify-center md:mt-4">
          {isLoading ? (
            <Spinner size={"lg"} />
          ) : (
            <TableSalesReport
              transaction={transaction}
              fetchTransaction={fetchTransaction}
            />
          )}
        </div>
      </NavTemplateAdmin>
    </>
  );
};
