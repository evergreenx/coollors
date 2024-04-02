import { client } from "@/config/client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Database } from "@/types/supabase";
import { stagger, useAnimate } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type db = Database["public"]["Tables"]["palettes"]["Row"];

export default function SavedPalettes({
  setShowSavedPalettes,
}: {
  setShowSavedPalettes: (value: boolean) => void;
}) {
  const [SavedPalettes, setSavedPalettes] = useState<db[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchUserPalettes = async () => {
      try {
        const { data } = await client.from("palettes").select();

        setSavedPalettes(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPalettes();
  }, []);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (SavedPalettes && SavedPalettes?.length > 0) {
      animate(
        "section",
        {
          opacity: 1,
        },

        {
          delay: stagger(0.09),
          duration: 0.5,
        }
      );
    }
  }, [SavedPalettes, isLoading]);

  if (!isDesktop) {
    return (
      <div ref={scope}>
        <div className="absolute left-0 z-0 top-0 overlay  h-screen w-full bg-black opacity-40"></div>

        <div className="pt-32 px-3 lg:w-full w-[90%] top-0  h-screen right-0 fixed lg:sticky bg-white ">
          <X
            className="absolute top-8"
            onClick={() => setShowSavedPalettes(false)}
          />
          <div className="relative bottom-0 left-0  rounded-lg     px-3 pb-4 pt-1   w-full">


{
!isLoading && SavedPalettes && SavedPalettes?.length <= 0 ? <p className="text-center font-semibold my-20">No saved palettes</p> : null

}


            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-2 border-t-black" />
              </div>
            ) : null}
            {!isLoading &&
              SavedPalettes?.map((palette) => {
                return (
                  <section key={palette.id} className="opacity-0">
                    <Link
                      href={`/color/${palette.colors}`}
                      className="flex  w-full item m-3"
                    >
                      {palette.colors?.split("-").map((i) => {
                        return (
                          <div
                            className="flex-1 flex justify-center items-center cursor-pointer  first:rounded-l-lg last:rounded-r-lg   h-[37px]"
                            key={palette.id}
                            style={{
                              background: `#${i}`,
                            }}
                          ></div>
                        );
                      })}
                    </Link>

                    <p className="text-xs m-3">{palette.title}</p>
                  </section>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={scope}
        className="pt-32 px-3 lg:w-full w-[90%] top-0  h-screen right-0 fixed lg:sticky bg-white "
      >
        <div className="relative bottom-0 left-0  rounded-lg     px-3 pb-4 pt-1   w-full">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-2 border-t-black" />
            </div>
          ) : null}

{
!isLoading && SavedPalettes && SavedPalettes?.length <= 0 ? <p className="text-center font-semibold my-20">No saved palettes</p> : null
}


          {!isLoading &&
            SavedPalettes?.map((palette) => {
              return (
                <section key={palette.id} className="opacity-0">
                  <Link
                    href={`/color/${palette.colors}`}
                    className="flex items  w-full m-3"
                  >
                    {palette.colors?.split("-").map((i) => {
                      return (
                        <div
                          className="flex-1 flex justify-center items-center cursor-pointer  first:rounded-l-lg last:rounded-r-lg   h-[37px]"
                          key={palette.id}
                          style={{
                            background: `#${i}`,
                          }}
                        ></div>
                      );
                    })}
                  </Link>

                  <p className="text-xs m-3">{palette.title}</p>
                </section>
              );
            })}
        </div>
      </div>
    </>
  );
}
