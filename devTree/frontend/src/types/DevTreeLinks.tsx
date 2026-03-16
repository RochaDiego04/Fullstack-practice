export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">;
