import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import LabelChip from "@/components/label-chip";
import { cn } from "@/lib/utils";

type LabelsInputProps = {
  labels: string[];
  setLabels: (labels: string[]) => void;
  maxLabels: number;
} & React.ComponentProps<typeof Input>;

function LabelsInput({
  className,
  labels,
  setLabels,
  maxLabels,
  ...props
}: LabelsInputProps) {
  const labelsInput = useRef<HTMLInputElement | null>(null);

  // Runs on key up
  function checkKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      if (labels.length === maxLabels) return;
      addLabel(e);
    } else if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      labels.length > 0
    ) {
      setLabels(labels.slice(0, labels.length - 1));
    }
  }

  function addLabel(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key !== "Enter") return;
    const label = e.currentTarget.value;
    if (label === "") return;
    setLabels([...labels, label]);
    e.currentTarget.value = "";
  }

  function removeLabel(labelIdx: number): void {
    setLabels(labels.filter((_, i) => i !== labelIdx));
  }

  return (
    <div
      className={cn(
        "labels flex h-full w-full flex-shrink flex-grow flex-row flex-wrap gap-2 pt-2",
        className,
      )}
      {...props}
    >
      {labels.map((label, i) => (
        <LabelChip key={label} onClickRemove={() => removeLabel(i)}>
          {label}
        </LabelChip>
      ))}
      <Input
        className="mt-2"
        autoCorrect={props.autoCorrect ?? "on"}
        spellCheck={props.spellCheck ?? true}
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        onKeyUp={checkKeyPress}
        ref={labelsInput}
      />
    </div>
  );
}

export default LabelsInput;
