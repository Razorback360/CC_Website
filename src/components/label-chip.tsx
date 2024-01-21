import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";

type LabelChipProps = {
  children: string;
  onClickRemove: (label: string) => void;
};

function LabelChip({ children, onClickRemove }: LabelChipProps) {
  return (
    <div
      className="select-none text-sm items-center justify-center font-semibold bg-transparent rounded-full outline outline-2 outline-border px-3 py-1 hover:cursor-pointer hover:bg-destructive hover:opacity-70 focus:outline focus:outline-0"
      onClick={() => onClickRemove(children)}
    >
      {children}
    </div>
  );
}

export default LabelChip;
