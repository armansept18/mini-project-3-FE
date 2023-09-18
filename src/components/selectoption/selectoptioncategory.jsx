import { Select } from "@chakra-ui/react";

export const SelectCategory = ({ category, onSelectCategory }) => {
  const handleCategoryChange = (event) => {
    const selectId = event.target.value;
    onSelectCategory(selectId);
  };

  return (
    <>
      <Select placeholder="Select Category" onChange={handleCategoryChange}>
        {Array.isArray(category) ? (
          category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.category_name}
            </option>
          ))
        ) : (
          <option value="">No categories available</option>
        )}
      </Select>
    </>
  );
};
