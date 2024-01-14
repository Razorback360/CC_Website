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
      className="flex flex-row select-none flex-grow-0 flex-shrink-0 gap-2 items-center justify-center font-semibold bg-transparent rounded-full max-h-fit min-w-fit outline outline-2 outline-neutral-700 pl-4 pr-1 py-1 hover:cursor-pointer hover:bg-neutral-800 hover:opacity-70 focus:outline focus:outline-2 focus:outline-white"
      onClick={() => onClickRemove(children)}
    >
      {children}
      <TiDelete className="w-4 h-4" />
    </div>
  );
}

export default LabelChip;
