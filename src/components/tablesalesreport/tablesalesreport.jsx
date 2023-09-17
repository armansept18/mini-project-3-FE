export const TableSalesReport = ({ transaction }) => {
  const headerKeys = Object.keys(transaction?.transactions[0]);
  console.log(headerKeys);
  return (
    <>
      <table class="table-auto border border-black">
        <thead className="border border-black  text-black">
          <tr className="border border-black ">
            {headerKeys.map((header) => {
              return <th className="border border-black">{header}</th>;
            })}
          </tr>
        </thead>
        <tbody className="border border-black">
          {transaction?.transactions?.map((item) => {
            return (
              <tr className="border border-black">
                <td className="border border-black">{item?.id}</td>
                <td className="border border-black">{item?.no_inv}</td>
                <td className="border border-black">{item?.cashier_id}</td>
                <td className="border border-black">{item?.customer_name}</td>
                <td className="border border-black">{item?.product_id}</td>
                <td className="border border-black">{item?.total_price}</td>
                <td className="border border-black">
                  {item?.transaction_date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
