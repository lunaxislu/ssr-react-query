export interface I_CurrentItemData {
  id: number;
  userId: string | number;
  title: string;
  content: string;
  tags: string[];
  images: { id: number; postId: number; image: string }[];
  thumbnail: string | null;
  updatedAt: string;
  postcategory: { id: number; category: string; postId: number }[];
}
