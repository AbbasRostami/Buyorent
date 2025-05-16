export interface CommentType {
  id: string;
  user: {
    id: string;
    fullName: string;
    profilePicture?: string;
  };
  title?: string;
  caption: string;
  rating: string;
  created_at: string;
  parent_comment_id: string | null;
  replies: CommentType[];
}
