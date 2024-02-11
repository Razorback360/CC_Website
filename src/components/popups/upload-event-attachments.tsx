import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormProvider, useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FileCheck2Icon } from "lucide-react";
import Dropzone from "@/components/ui/dropzone";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type PopupProps = {
  eventTitle: string;
} & React.ComponentProps<typeof Dialog>;

const allowedTypes = [
  { name: "image", types: ["image/jpeg", "image/png", "image/jpg"] },
  { name: "pdf", types: ["application/pdf"] },
  {
    name: "word",
    types: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  { name: "csv", types: ["text/csv"] },
  {
    name: "excel",
    types: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
  },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const uploadAttachmentsSchema = z.object({
  files: z
    .custom<FileList>()
    .superRefine((filesObject, ctx) => {
      if (filesObject && filesObject.length > 0) {
        const filesArray = Array.from(filesObject);
        if (
          // if any file is not allowed, return false
          filesArray.some(
            (file) =>
              !allowedTypes
                .map((allowedType) => allowedType.types)
                .flat()
                .includes(file.type),
          )
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File or Files type is invalid",
          });
          return false;
        }

        if (filesArray.some((file) => file.size > MAX_FILE_SIZE)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File or Files exceeds maximum size of 5MB",
          });
          return false;
        }

        return true;
      }

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "File must be provided",
      });
      return false;
    })
    .nullable(),
});

const UploadEventAttachmentsDialog = ({ children, eventTitle }: PopupProps) => {
  const form = useForm<z.infer<typeof uploadAttachmentsSchema>>({
    defaultValues: {
      files: null,
    },
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
  });

  function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      // check if any file is not allowed, if so, clear the files and set an error
      const validationError =
        uploadAttachmentsSchema.safeParse({
          files: acceptedFiles,
        }).success === false;

      if (validationError) {
        form.setValue("files", null);
        form.setError("files", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        form.setValue("files", acceptedFiles);
        form.clearErrors("files");
      }
    }
  }

  const handleFormSubmit = (data: { files: FileList | null }) => {
    console.log("Accepted files: ", data.files);
  };

  return (
    <FormProvider {...form}>
      <Dialog>
        {children}
        <DialogContent className="max-w-fit">
          <Form {...form}>
            <form
              className="flex flex-col items-center justify-start gap-2 w-[60vw] h-[80vh]"
              onSubmit={form.handleSubmit(handleFormSubmit)}
              noValidate
              autoComplete="off"
            >
              <DialogHeader>
                <DialogTitle>Attachments for {eventTitle}</DialogTitle>
                <DialogDescription>
                  Upload attachments for {eventTitle}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-x-2 w-full h-full">
                <FormField
                  control={form.control}
                  name="files"
                  render={({ field }) => (
                    <FormItem className="min-h-[16rem] w-full">
                      <FormControl>
                        <Dropzone
                          {...field}
                          className="h-full w-full"
                          multiple
                          accept={allowedTypes
                            .map((allowedType) => allowedType.types)
                            .flat()
                            .join(", ")}
                          dropMessage="Drop files or click here"
                          handleOnDrop={handleOnDrop}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.files?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                {form.watch("files") && (
                  <div className="flex items-center justify-center gap-3 p-4 relative">
                    <FileCheck2Icon className="h-4 w-4" />
                    <p className="text-sm font-medium">
                      {form.watch("files")?.length} files selected
                    </p>
                  </div>
                )}
                <Separator className="w-full" />
                <ScrollArea className="h-72 w-full">
                  <div className="grid grid-cols-3 gap-2 w-full h-full">
                    {Array.from(form.watch("files") ?? []).map(
                      (file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt="file"
                          className="aspect-square h-full w-full"
                        />
                      ),
                    )}
                  </div>
                </ScrollArea>
              </div>
              <DialogFooter>
                {/* a save button that executes onConfirm */}
                <DialogClose asChild>
                  <Button className="self-end" variant="default" type="submit">
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default UploadEventAttachmentsDialog;
