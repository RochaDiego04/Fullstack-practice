import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import type { User } from "../types/User";
import type { SocialNetwork } from "../types/DevTreeLinks";
import { buildStoredLinks } from "../utils/linkHelpers";

export default function LinkTreePage() {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const [devTreeLinks, setDevTreeLinks] = useState(() => {
    const savedLinks: SocialNetwork[] = JSON.parse(user.links);
    return social.map((item) => {
      const saved = savedLinks.find((l) => l.name === item.name);
      return saved ? { ...item, url: saved.url, enabled: saved.enabled } : item;
    });
  });

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Update was successful");
    },
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    // updating local
    setDevTreeLinks(updatedLinks);

    // updating tanstack cache
    const currentStored: SocialNetwork[] = JSON.parse(
      queryClient.getQueryData<User>(["user"])!.links,
    );
    queryClient.setQueryData(["user"], (prevUser: User) => ({
      ...prevUser,
      links: JSON.stringify(buildStoredLinks(updatedLinks, currentStored)),
    }));
  };

  const handleToggleChange = (itemName: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === itemName) {
        if (!link.enabled && !isValidUrl(link.url)) {
          toast.error("URL is not valid");
          return link;
        }
        return { ...link, enabled: !link.enabled };
      }
      return link;
    });

    // updating local
    setDevTreeLinks(updatedLinks);

    // updating tanstack cache
    const currentStored: SocialNetwork[] = JSON.parse(
      queryClient.getQueryData<User>(["user"])!.links,
    );
    queryClient.setQueryData(["user"], (prevUser: User) => ({
      ...prevUser,
      links: JSON.stringify(buildStoredLinks(updatedLinks, currentStored)),
    }));
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleToggleChange={handleToggleChange}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
        onClick={() => mutate(queryClient.getQueryData<User>(["user"])!)}
      >
        Save Changes
      </button>
    </div>
  );
}
