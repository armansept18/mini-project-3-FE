import { Select } from "@chakra-ui/react";

export const SelectCategory = ({
  category,
  onSelectCategory,
  edit,
  onSelectCategoryEdit,
}) => {
  const handleCategoryChange = (event) => {
    const selectId = event.target.value;
    onSelectCategory(selectId);
  };
  console.log(edit, "INI DI SELECT");
  const handleCategoryChangeEdit = (event) => {
    const selectId = event.target.value;
    onSelectCategoryEdit(selectId);
  };

  return (
    <>
      <Select
        placeholder="Select Category"
        onChange={edit ? handleCategoryChangeEdit : handleCategoryChange}
      >
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
