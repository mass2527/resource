import { VALID_IMAGE_FILE_TYPES } from "../../lib/constants";
import { useCreateResourceMutation } from "./mutations";

export default function ImageResourceCreateButton() {
  const createResourceMutation = useCreateResourceMutation();

  return (
    <label className="w-full border rounded flex justify-center items-center">
      이미지 추가{createResourceMutation.isPending && "..."}
      <input
        type="file"
        accept={VALID_IMAGE_FILE_TYPES.join(",")}
        disabled={createResourceMutation.isPending}
        multiple
        className="opacity-0 w-0 h-0"
        onChange={(event) => {
          const fileList = event.target.files;
          if (fileList === null || fileList.length === 0) {
            return;
          }

          for (const file of fileList) {
            const isValidImageFileType = VALID_IMAGE_FILE_TYPES.includes(
              file.type
            );
            if (isValidImageFileType) {
              const imageUrl = URL.createObjectURL(file);
              createResourceMutation.mutate(
                {
                  type: "image",
                  name: file.name,
                  url: imageUrl,
                },
                {
                  onError: (error) => {
                    alert(error);
                  },
                }
              );
            } else {
              alert(`파일명: ${file.name}
        .png, .jpg 형식의 이미지 파일을 업로드해 주세요.
        `);
            }
          }
        }}
      />
    </label>
  );
}
