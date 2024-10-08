import { I_CurrentItemData } from "@/types/current/current";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
interface I_CurrentItemDataProps {
  gallery: I_CurrentItemData;
}
const CurrentListItem = ({ gallery }: I_CurrentItemDataProps) => {
  const router = useRouter();
  const mainImage =
    gallery?.thumbnail ||
    (gallery?.images.length > 0 ? gallery?.images[0]?.image : null);

  const handleClick = () => {
    router.push(`/gallery/detail/${gallery.id}`);
  };
  return (
    <div
      className="flex flex-col items-center w-[30.2rem] h-[32.5rem] bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {mainImage && (
        <span className="w-[30.2rem] h-[20rem] object-cover mb-6 relative">
          <Image
            src={mainImage ? mainImage : ""}
            alt={gallery.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </span>
      )}

      <h3 className="text-xl font-bold mb-2">{gallery?.title}</h3>
      <p className="text-gray-500 mb-4">{gallery?.content}</p>
      <div className="flex space-x-2">
        {gallery?.postcategory?.map((category) => (
          <span
            key={category.id}
            className="bg-gray-200 px-2 py-1 rounded-full text-sm"
          >
            {category.category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CurrentListItem;
