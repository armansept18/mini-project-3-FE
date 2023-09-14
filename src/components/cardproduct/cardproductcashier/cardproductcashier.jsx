export const CardCoffe = ({ item }) => {
  return (
    <>
      <div
        className="bg-gray-100 p-2 mt-10 max-md:w-36 max-md:mt-40 "
        style={{ borderRadius: "12px", boxShadow: "2px 2px 3px black" }}
      >
        <div className="flex justify-center">
          <img
            style={{
              borderRadius: "12px",
              boxShadow: "1px 1px 2px black",
              width: "150px",
              height: "100px",
            }}
            className="object-fill"
            src={item.image}
            alt=""
          />
        </div>
        <div className="col-auto items-center">
          <div className="flex justify-center p-2 text-center">
            <span
              className="font-bold text-sm w-20"
              style={{ fontSize: "14px" }}
            >
              {item.product_name}
            </span>
          </div>
          <div className="flex justify-center">
            <span style={{ fontSize: "14px" }}>Rp. {item.price}</span>
          </div>
        </div>
      </div>
    </>
  );
};
