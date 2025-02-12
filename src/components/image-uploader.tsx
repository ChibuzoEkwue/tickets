"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

const ImageUploader = () => {
  const { setValue, watch, control } = useFormContext(); // React Hook Form integration
  const avatar = watch("avatar"); // Get current avatar value

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setLoading(true);
      setError(null); 

      if (!UPLOAD_PRESET || !CLOUDINARY_URL) {
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        const uploadedImage = response.data.secure_url;

        setValue("avatar", uploadedImage);
      } catch (error) {
        console.error("Upload failed:", error);
        setError("Failed to upload image. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <FormField
      control={control}
      name="avatar"
      render={({ fieldState }) => (
        <FormItem className="flex flex-col items-center gap-4">
          <FormLabel className="text-gray-600">
            Upload Profile Picture
          </FormLabel>
          <FormControl>
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <ScaleLoader color="#4F46E5" />
                <span className="text-gray-600">Uploading...</span>
              </div>
            ) : avatar ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={avatar}
                  height={200}
                  width={200}
                  alt="Uploaded Avatar"
                  className="rounded-lg object-cover shadow-lg"
                  unoptimized={true}
                />
                <Button
                  variant="outline"
                  className="mt-2 px-4 py-2"
                  onClick={() => {
                    setValue("avatar", ""); // Reset value
                  }}
                >
                  Upload Another
                </Button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className="flex h-40 w-80 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-100 p-4 transition hover:bg-gray-200 sm:w-[24rem]"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-gray-600">Drop the image here...</p>
                ) : (
                  <p className="text-gray-600">
                    Drag & drop an image or{" "}
                    <span className="font-semibold">click</span> to upload
                  </p>
                )}
              </div>
            )}
          </FormControl>

          {/* Display validation and upload errors */}
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </FormItem>
      )}
    />
  );
};

export default ImageUploader;
