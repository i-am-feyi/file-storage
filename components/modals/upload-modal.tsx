"use client";

import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUploadModal } from "@/hooks/use-upload-modal";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useOrganization, useUser } from "@clerk/nextjs";
import { fileTypes } from "@/constants/index";

const uploadFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Enter a valid file name." })
    .max(200, { message: "File name is too long!" }),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Select a file to upload.")
    .refine((files) => files.length > 0, "Select a file to upload."),
});

type uploadSchema = z.infer<typeof uploadFormSchema>;
type successResponse = {
  storageId: string;
};

const UploadModal = () => {
  const { isOpen, onClose } = useUploadModal();

  const { isLoaded, organization } = useOrganization();
  const { user } = useUser();

  const orgId = organization?.id ?? user?.id;

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);

  const { startUpload, isUploading } = useUploadFiles(generateUploadUrl, {
    onUploadComplete: async (res) => {
      console.log(res);
      const response = res[0].response as successResponse;
      if (response.storageId) {
        const storageId = response.storageId as Id<"_storage">;

        if (isLoaded && user) {
          await createFile({
            fileStorageId: storageId,
            name: form.getValues("title"),
            orgId: orgId!,
            type: fileTypes[res[0].type],
          });
        }
      }
      form.reset();
      onClose();
      toast.success("File uploaded successfully!", { duration: 3000 });
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
              <Button type="submit" disabled={isUploading}>
                {isUploading ? <Loader2 className="animate-spin" /> : <span>Submit</span>}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadModal;
