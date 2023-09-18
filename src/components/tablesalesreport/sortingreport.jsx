const { BsArrowDownUp, BsArrowDown, BsArrowUp } = require("react-icons/bs");

export const SortingReport = ({ sortOrder, setSortOrder }) => {
  console.log(sortOrder.sortby);
  return (
    <>
      <div className="cursor-pointer">
        {sortOrder.sortby === "asc" ? (
          <BsArrowUp onClick={() => setSortOrder({ sortby: "desc" })} />
        ) : (
          <BsArrowDown onClick={() => setSortOrder({ sortby: "asc" })} />
        )}
      </div>
    </>
  );
};
