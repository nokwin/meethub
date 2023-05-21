"use client";

import useForwardRef from "@/hooks/use-forwarded-ref.hook";
import { forwardRef, useState } from "react";
import Button from "./button.component";
import Image from "next/image";

interface ImageInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  defaultImage?: string;
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  function ImageInput({ error, disabled, defaultImage, ...inputProps }, ref) {
    const inputRef = useForwardRef<HTMLInputElement>(ref);
    const [imageUrl, setImageUrl] = useState<string | null>(defaultImage || null);

    const handleButtonClick = () => {
      inputRef.current?.click();
    };

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
      inputProps.onChange(e);

      const file = e.target.files?.[0];
      if (!file) {
        setImageUrl(null);
        return;
      }

      setImageUrl(URL.createObjectURL(file));
    };

    return (
      <div className="mb-4">
        {imageUrl && (
          <div className="w-full h-80 relative">
            <Image
              src={imageUrl}
              fill
              alt="banner"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <input
          className="w-full border-0 rounded py-2 px-4 hidden"
          {...inputProps}
          onChange={handleOnchange}
          ref={inputRef}
          type="file"
          accept="image/*"
        />
        <Button onClick={handleButtonClick} disabled={disabled}>
          Upload image
        </Button>
        {error && <div className="text-white">{error}</div>}
      </div>
    );
  }
);

export default ImageInput;
