'use client';

import { useEffect, useState, type ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt?: string };

export default function ResilientImage({ src, alt = '', className = '', onError, ...props }: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div className={`grid place-items-center bg-[#151515] text-[10px] tracking-[0.18em] text-[#5A5A5A] ${className}`} role="img" aria-label={alt || 'Image unavailable'}>
        VISUAL STUDY
      </div>
    );
  }

  return <img {...props} src={src} alt={alt} className={className} onError={(event) => { onError?.(event); setFailed(true); }} />;
}
