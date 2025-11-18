type ImagePreviewProps = {
  src: string;
  alt: string;
};

export const ImagePreview = ({ src, alt }: ImagePreviewProps) => (
  <div className="w-full aspect-square rounded-[20px] border border-solid border-black overflow-hidden">
    <img className="w-full h-full object-cover" alt={alt} src={src} />
  </div>
);
