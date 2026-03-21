import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { UploadWidgetValue } from "@/types/index.types";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fa } from "zod/v4/locales";

const UploadWidget = ({ value = null, onChange, disabled = false }) => {
  const [preview, setPreview] = useState(value);
  const widgetRef = useRef(null);
  const onChangeRef = useRef(onChange);
  
 
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidget = () => {
      if (!window.cloudinary || widgetRef.current) return false;

      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUDINARY_CLOUD_NAME,
          uploadPreset: CLOUDINARY_UPLOAD_PRESET,
          multiple: false,
          folder: "uploads",
          maxFileSize: 5_000_000,
          clientAllowedFormats: ["png", "jpg", "jpeg"],
        },
        (error, result) => {
          if (!error && result.event === "success") {
            const payload: UploadWidgetValue = {
              url: result.info.secure_url,
              publicId: result.info.public_id,
            };

            setPreview(payload);
            onChangeRef.current?.(payload);
          }
        }
      );

      return true;
    };

    if (initializeWidget()) return;

    const intervalId = window.setInterval(() => {
      if (initializeWidget()) {
        window.clearInterval(intervalId);
      }
    }, 500);

    return () => window.clearInterval(intervalId);
  }, []);


  const openWidget = () => {
    if (!disabled) {widgetRef.current?.open();}
  };

  const removeFromCloudinary = async () => {
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="upload-preview">
          <img src={preview.url} />
        </div>
      ) : (
        <div className="upload-dropzone" role="button" tabIndex={0}

          onClick={openWidget} onKeyDown={(event) => {
            if (event.key == 'Enter') {
              event.preventDefault();
              openWidget();

            }
          }}
        >
          <div className="upload-prompt">
            <UploadCloud className="icon" />
            <p>Click to upload photo</p>
            <p>PNG , JPG up to 5MB</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default UploadWidget;

