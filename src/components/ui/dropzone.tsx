import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useRef } from "react";

interface DropzoneProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  className?: string;
  dropMessage: string;
  handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ className, dropMessage, handleOnDrop, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // Function to handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    // Function to handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    return (
      <Card
        ref={ref}
        className={cn(
          `border-2 border-dashed bg-muted hover:cursor-pointer border-muted-foreground/30 hover:border-muted-foreground/80`,
          className,
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="flex items-center justify-center text-muted-foreground h-full w-full space-y-2 px-2 py-4 text-sm">
          <span className="font-medium ">{dropMessage}</span>
          <Input
            {...props}
            value={undefined}
            ref={inputRef}
            type="file"
            className={cn("hidden")}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleOnDrop(e.target.files)
            }
          />
        </div>
      </Card>
    );
  },
);
Dropzone.displayName = "Dropzone";

export default Dropzone;
