import React from "react";
import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function DropdownField({ item, handleInputChange, carInfo }) {
  return (
    <div>
      <Select
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item.required}
        defaultValue={carInfo?.[item?.name]}
      >
        <SelectTrigger className="w-full text-black">
          <SelectValue placeholder={carInfo?.[item?.name]?carInfo?.[item?.name]:item.label} />
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

DropdownField.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DropdownField;
