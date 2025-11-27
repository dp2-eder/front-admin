import { useState, useRef } from "react";

type FileUploaderProps = {
  entityId: string;
  uploadFunction: (id: string, file: File) => Promise<any>;
  onUploadSuccess?: () => void;
};

export const FileUploader = ({
  entityId,
  uploadFunction,
  onUploadSuccess,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !entityId) return;

    setUploading(true);
    try {
      await uploadFunction(entityId, file);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onUploadSuccess?.();
    } catch (error) {
      alert("Error al subir la imagen: " + error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-3 w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex-grow h-10 px-3 py-2 bg-white rounded-md border border-solid border-slate-500 cursor-pointer hover:bg-gray-50 flex items-center"
        >
          <span
            className={`text-sm ${file ? "text-[#0E0E2C]" : "text-slate-400"} truncate`}
          >
            {file ? file.name : "Seleccionar archivo..."}
          </span>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`h-10 px-4 bg-[#004166] text-white rounded-2xl font-medium transition-all
            ${!file || uploading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {uploading ? "Subiendo..." : "Subir"}
        </button>
      </div>
    </div>
  );
};
