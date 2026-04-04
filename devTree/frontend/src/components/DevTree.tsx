import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { User } from "../types/User";
import { useMemo } from "react";
import type { SocialNetwork } from "../types/DevTreeLinks";
import DevTreeLink from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type DevTreeProps = {
  data: User;
};

export default function DevTree({ data }: DevTreeProps) {
  const queryClient = useQueryClient();

  const allLinks: SocialNetwork[] = useMemo(
    () => JSON.parse(data.links),
    [data],
  );

  const enabledLinks = useMemo(
    () => allLinks.filter((item) => item.enabled),
    [allLinks],
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over || active.id === over.id) {
      return;
    }

    const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
    const newIndex = enabledLinks.findIndex((link) => link.id === over.id);

    const reorderedEnabled = arrayMove(enabledLinks, prevIndex, newIndex);

    // Rebuild the full links array: reordered enabled links first, then disabled
    const disabledLinks = allLinks.filter((item) => !item.enabled);
    const updatedLinks = [...reorderedEnabled, ...disabledLinks];

    queryClient.setQueryData(["user"], (prevUser: User) => ({
      ...prevUser,
      links: JSON.stringify(updatedLinks),
    }));
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit My Profile: /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt="Profile Image"
                  className="mx-auto max-w-[250px]"
                />
              )}

              <p className="text-center text-lg font-black text-white">
                {data.description}
              </p>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="mt-20 flex flex-col gap-5">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link: SocialNetwork) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
