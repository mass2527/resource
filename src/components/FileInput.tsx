import { cn } from "../lib/utils";

export default function FileInput({
  label,
  disabled,
  onUpload,
  multiple,
  validFileTypes,
}: {
  label: string;
  disabled: boolean;
  onUpload: (file: File) => void;
  multiple?: boolean;
  validFileTypes: string[];
}) {
  return (
    <label
      className={cn("w-full border rounded flex justify-center items-center", {
        "bg-zinc-300": disabled,
      })}
    >
      {label}
      <input
        type="file"
        accept={validFileTypes.join(",")}
        disabled={disabled}
        multiple={multiple}
        className="opacity-0 w-0 h-0"
        onChange={(event) => {
          const fileList = event.target.files;
          if (fileList === null || fileList.length === 0) {
            return;
          }

          for (const file of fileList) {
            const isValidImageFileType = validFileTypes.includes(file.type);
            if (isValidImageFileType) {
              onUpload(file);
            } else {
              alert(`파일명: ${file.name}의 파일 형식이 올바르지 않습니다.
              허용된 파일 형식: ${validFileTypes.join(", ")}
        `);
            }
          }
        }}
      />
    </label>
  );
}
