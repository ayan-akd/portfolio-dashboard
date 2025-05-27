"use client";

import { UploadCloud, File, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { uploadResumeFile } from "@/services/uploadToDrive";

interface FileUploaderProps {
  label?: string;
  resumeFileId: string;
  onUploadSuccess?: (result: { fileId?: string; driveLink?: string }) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in MB
}

export function FileUploader({
  label = "Upload File",
  resumeFileId,
  onUploadSuccess,
  acceptedFileTypes = ".pdf,.doc,.docx",
  maxFileSize = 10,
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [driveLink, setDriveLink] = useState<string>("");

  // Validate file type and size
  const validateFile = (file: File): boolean => {
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      toast.error(`File size must be less than ${maxFileSize}MB`);
      return false;
    }

    // Check file type
    const fileExtension = file.name.toLowerCase().split(".").pop();
    const allowedExtensions = acceptedFileTypes.replace(/\./g, "").split(",");

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      toast.error(`Please upload a valid file type: ${acceptedFileTypes}`);
      return false;
    }

    return true;
  };

  // Handle file upload
  const handleUpload = async (selectedFile: File) => {
    if (!validateFile(selectedFile)) {
      return;
    }

    setFile(selectedFile);
    setLoading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("resumeLink", resumeFileId);

      const result = await uploadResumeFile(formData);

      if (result.success) {
        setUploadSuccess(true);
        setDriveLink(result.driveLink || "");
        toast.success("File uploaded successfully!");

        if (onUploadSuccess) {
          onUploadSuccess({
            fileId: result.fileId as string,
            driveLink: result.driveLink,
          });
        }
      } else {
        throw new Error("Upload failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection via input
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    await handleUpload(selectedFile);
  };

  // Handle drag and drop
  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    await handleUpload(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    setFile(null);
    setUploadSuccess(false);
    setDriveLink("");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      <label
        className={cn(
          "border-2 border-dashed border-primary/50 rounded-xl p-6 text-center cursor-pointer flex flex-col items-center gap-3 transition-colors",
          file && "bg-secondary/10",
          loading && "opacity-50 pointer-events-none",
          uploadSuccess && "border-green-500 bg-green-50 dark:bg-green-950/20"
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {uploadSuccess ? (
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        ) : (
          <UploadCloud className="w-8 h-8 text-primary" />
        )}

        <div className="space-y-1">
          <span className="text-sm text-muted-foreground block">
            {loading
              ? "Uploading..."
              : uploadSuccess
              ? "File uploaded successfully!"
              : "Click or drag a file to upload"}
          </span>

          <span className="text-xs text-muted-foreground">
            Supported formats: {acceptedFileTypes} (Max {maxFileSize}MB)
          </span>
        </div>

        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          disabled={loading}
        />
      </label>

      {file && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
            <div className="flex items-center gap-2">
              <File className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
              </div>
            </div>

            {uploadSuccess && (
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            )}
          </div>

          {uploadSuccess && driveLink && (
            <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                File uploaded successfully to Google Drive!
              </p>
              <a
                href={driveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                View in Google Drive
              </a>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleRemove}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Remove File
            </Button>

            {uploadSuccess && driveLink && (
              <Button
                type="button"
                onClick={() => window.open(driveLink, "_blank")}
                variant="default"
                size="sm"
                className="flex-1"
              >
                Open File
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
