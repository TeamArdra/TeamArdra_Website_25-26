import Image from "next/image";

export default function ImageCard({ url, alt }) {
  return (
    <div className="
      relative
      w-64 h-64
      md:w-72 md:h-72
      rounded-2xl
      overflow-hidden
      bg-[#F8F8E2]
      flex items-center justify-center
    ">
      <div className="relative w-[90%] h-[90%]">
        <Image
          src={url}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 256px, 288px"
        />
      </div>
    </div>
  );
}
