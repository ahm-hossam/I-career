'use client';

import { useRef, useState } from 'react';
import { Loader2, Paperclip, X } from 'lucide-react';

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/uploads', { method: 'POST', body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Upload failed');
  return data.url as string;
}

export function FileUploadField({
  label,
  multiple = false,
  urls,
  onChange,
}: {
  label: string;
  multiple?: boolean;
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const uploaded = await Promise.all(Array.from(fileList).map(uploadFile));
      onChange(multiple ? [...urls, ...uploaded] : uploaded);
    } catch {
      setError('Upload failed. PDF, JPG, JPEG, PNG only, max 10 MB.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
      {label}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/15 px-4 py-6 text-center transition-colors hover:border-brand-500 disabled:cursor-not-allowed"
      >
        {uploading ? <Loader2 size={20} className="animate-spin text-brand-500" /> : <Paperclip size={20} className="text-ink-faint" />}
        <span className="text-sm font-medium text-ink-soft">Click to upload or drag files here</span>
        <span className="text-xs font-normal text-ink-faint">PDF, jpg, png, jpeg (max 10 MB).</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <p className="text-xs font-medium text-status-coral">{error}</p>}
      {urls.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {urls.map((url, i) => (
            <li key={url} className="flex items-center justify-between rounded-lg bg-ink/[0.03] px-3 py-2 text-xs font-medium text-ink-soft">
              <span className="truncate">{url.split('/').pop()}</span>
              <button
                type="button"
                onClick={() => onChange(urls.filter((_, idx) => idx !== i))}
                aria-label="Remove file"
                className="text-ink-faint hover:text-status-coral"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
