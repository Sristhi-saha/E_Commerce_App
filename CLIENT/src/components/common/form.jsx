import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function CommonForm({
  formControls = [],
  formData = {},
  setFormData,
  onSubmit,
  isBtnDisabled,
  buttonText = "Submit",
}) {
  function renderInputsByComponentType(controlItem) {
    const rawValue = formData?.[controlItem.name];

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            type={controlItem.type || "text"}
            placeholder={controlItem.placeholder}
            name={controlItem.name}
            id={controlItem.name}
            value={rawValue ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: e.target.value,
              }))
            }
          />
        );

     case "select":
  return (
    <Select
      value={formData?.[controlItem.name] || undefined}
      onValueChange={(val) =>
        setFormData((prev) => ({
          ...prev,
          [controlItem.name]: val,
        }))
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={controlItem.placeholder} />
      </SelectTrigger>

      <SelectContent>
        {controlItem.options?.map((option, index) => (
          <SelectItem
            key={option.id || option.value || index}
            value={option.id || option.value}
          >
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
            value={rawValue ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [controlItem.name]: e.target.value,
              }))
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
          <div key={controlItem.name || index} className="grid gap-1.5">
            <label htmlFor={controlItem.name} className="text-sm font-medium">
              {controlItem.label}
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={isBtnDisabled}
        className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
      >
        {buttonText}
      </button>
    </form>
  );
}