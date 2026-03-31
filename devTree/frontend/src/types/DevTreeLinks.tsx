export type SocialNetwork = {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">;
