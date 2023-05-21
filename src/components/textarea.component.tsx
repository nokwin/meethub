"use client";

import { forwardRef } from "react";

interface TextareaProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ error, ...inputProps }, ref) {
    return (
      <div className="mb-4">
        <textarea
          className="w-full border-0 rounded py-2 px-4"
          {...inputProps}
          ref={ref}
          rows={5}
        />
        {error && <div className="text-white">{error}</div>}
      </div>
    );
  }
);

export default Textarea;
