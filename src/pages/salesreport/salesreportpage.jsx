import { useEffect, useState } from "react";
import { TableSalesReport } from "../../components/tablesalesreport/tablesalesreport";
import { NavTemplateAdmin } from "../../components/template/template";
import api from "../../api/api";
import { Spinner } from "@chakra-ui/spinner";
import { SortingReport } from "../../components/tablesalesreport/sortingreport";

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
  }, [sortOrder]);
  return (
    <>
      <NavTemplateAdmin>
        <div className="col-auto items-center md:mt-4">
          <div className="flex justify-end md:mr-24">
            <div
              className="border border-black "
              style={{ boxShadow: "1px 1px 2px black" }}
            >
              <SortingReport
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>
          </div>
          <div className="flex justify-end md:mr-28">
            {isLoading ? (
              <div className="flex justify-end md:mr-96 md:mt-52">
                <Spinner size={"lg"} />
              </div>
            ) : (
              <TableSalesReport
                transaction={transaction}
                fetchTransaction={fetchTransaction}
              />
            )}
          </div>
        </div>
      </NavTemplateAdmin>
    </>
  );
};
