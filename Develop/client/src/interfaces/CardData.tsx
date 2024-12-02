export interface CardData {
  id: number;
  username: string;
  links: { url: string; description: string }[];
  userId?: number;
}
