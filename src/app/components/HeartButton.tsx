'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

import ClientOnly from "./ClientOnly";

interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    });

    // return (
    //     <div
    //         onClick={toggleFavorite}
    //         className="
    //     relative
    //     hover:opacity-80
    //     transition
    //     cursor-pointer
    //   "
    //     >
    //         <AiOutlineHeart
    //             size={28}
    //             className="
    //       fill-white
    //       absolute
    //       -top-[2px]
    //       -right-[2px]
    //     "
    //         />
    //         <AiFillHeart
    //             size={24}
    //             className={
    //                 hasFavorited ? 'fill-[#3604ff]' : 'fill-transparent'
    //             }
    //         />
    //     </div>
    // );

    return (
        <div
            onClick={toggleFavorite}
            className="absolute top-1 right-1 z-30 cursor-pointer"
        >
            <div
            className={`
                p-2 rounded-full backdrop-blur-sm border transition 
                ${hasFavorited ? 'border-white/80 bg-white/20' : 'border-white/30 bg-white/10 hover:border-white/60'}
            `}
            >
            {hasFavorited ? (
                <AiFillHeart size={18} className="text-white drop-shadow-md" />
            ) : (
                <AiOutlineHeart size={18} className="text-white drop-shadow-md" />
            )}
            </div>
        </div>
    );
}

export default HeartButton;