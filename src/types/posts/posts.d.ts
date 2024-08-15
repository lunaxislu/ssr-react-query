// infinityScroll로 가져오는 각 post 타입
interface Post {
  id: number; // 각 post의 고유 id
  userId: number; // post를 쓴 user의 id
  thumbnail: string; // 대빵 이미지
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// postDetail Page에서 보여줄 데이터
interface PostDetail {
  id: number; // Post
  userId: number; // Post
  thumbnail: string | null; // Post
  title: string; // Post
  content: string; // Post
  tags: string[];
  images: { id: number; postId: number; image: string }[];
  updatedAt: string;
  postcategory: { id: number; category: string; postId: number }[]; // 다른 API 호출로 받아오는거
  postComments: {}[]; // 5개만 가져오고,
}

interface PostCategory {
  id: number; // 각 category의 고유 아이디
  category: string;
  postId: number; //각 post의 고유 id
}
[];
