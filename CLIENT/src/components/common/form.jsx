import React from "react";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function CommonForm({
  formControls = [], // Add default empty array here
  formData,
  setFormData,
  onSubmit,
  disabled,
  buttonText = "Submit",
}) {
  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || "";

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            id={controlItem.name}
            value={value}
            disabled={disabled}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            disabled={disabled}
            onValueChange={(val) =>
              setFormData({ ...formData, [controlItem.name]: val })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItem.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {controlItem.options && controlItem.options.map((option, index) => ( 
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            id={controlItem.name}
            disabled={disabled}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );

      default:
        return null;
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem, index) => (
          <div key={index} className="grid gap-1.5">
            <label htmlFor={controlItem.name}>
              {controlItem.label}
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-950 transition-colors w-full"
      >
        {buttonText}
      </button>
    </form>
  );
}