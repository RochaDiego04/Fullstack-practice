import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import type { User } from "../types/User";
import type { DevTreeLink, SocialNetwork } from "../types/DevTreeLinks";

/**
 * Derives the payload to store in user.links:
 * - Includes all networks where the URL is non-empty (enabled or not)
 * - Assigns sequential 1-based ids based on position in devTreeLinks order
 * - This makes ids stable and ready for drag-and-drop reordering
 */
function buildLinksPayload(links: DevTreeLink[]): SocialNetwork[] {
  return links
    .filter((link) => link.url.trim() !== "")
    .map((link, index) => ({ ...link, id: index + 1 }));
}

export default function LinkTreePage() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Update was successful");
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name,
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevUser: User) => ({
      ...prevUser,
      links: JSON.stringify(buildLinksPayload(updatedLinks)),
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

    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevUser: User) => ({
      ...prevUser,
      links: JSON.stringify(buildLinksPayload(updatedLinks)),
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
        onClick={() => mutate(user)}
      >
        Save Changes
      </button>
    </div>
  );
}
