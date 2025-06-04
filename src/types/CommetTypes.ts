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

export interface CommentItemProps {
  comment: CommentType;
  houseId: string;
  depth?: number;
}

export interface ReplyFormValues {
  title: string;
  caption: string;
  rating: number;
}

export type CreateReplyInput = {
  title: string;
  caption: string;
  parent_comment_id: string;
  rating: number;
};

export type CreateReplyResponse = {
  id: string;
  house_id: string;
  user_id: string;
  title: string;
  caption: string;
  rating: string;
  parent_comment_id: string;
  created_at: string;
};

// NewCommentModal.tsx

export interface Props {
  houseId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export interface CommentFormValues {
  title: string;
  caption: string;
  rating: number;
  parent_comment_id: string | null;
}
