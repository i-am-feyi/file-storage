"use client";

import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUploadModal } from "@/hooks/use-upload-modal";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

type Props = {};

const uploadFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Enter a valid file name." })
    .max(200, { message: "File name is too long!" }),
  // file: z.custom<File | null>((val) => val instanceof File, "Required"),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Select a file to upload.")
    .refine((files) => files.length > 0, "Select a file to upload."),
});

type uploadSchema = z.infer<typeof uploadFormSchema>;
type successResponse = {
  storageId: string;
};

const UploadModal = (props: Props) => {
  const { isOpen, onClose } = useUploadModal();

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const { startUpload, isUploading } = useUploadFiles(generateUploadUrl, {
    onUploadComplete: async (res) => {
      console.log(res);
      form.reset();
      onClose();
      toast.success("File uploaded successfully!");
    },
    onUploadProgress: (p) => {
      console.log(p);
    },
    onUploadError: () => toast.error("An error occurred while uploading the file."),
  });

  const form = useForm<uploadSchema>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  const onSubmit = (values: uploadSchema) => {
    console.log(values);

    void startUpload([values.file[0]]);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Upload Your File</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filename</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadModal;
