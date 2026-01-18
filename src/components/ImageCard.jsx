import Image from "next/image";

export default function ImageCard({ url, alt }) {
  return (
    <div className="relative w-64 h-40 rounded-2xl overflow-hidden bg-neutral-800">
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
