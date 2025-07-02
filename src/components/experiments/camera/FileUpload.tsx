
import { forwardRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ onFileSelect, accept = "image/*" }, ref) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    };

    return (
      <input
        ref={ref}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
