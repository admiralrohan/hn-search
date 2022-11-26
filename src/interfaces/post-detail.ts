export interface PostDetail {
  id: number;
  created_at: Date;
  created_at_i: number;
  type: Type;
  author: null | string;
  title: null | string;
  url: null | string;
  text: null | string;
  points: number | null;
  parent_id: number | null;
  story_id: number | null;
  children: PostDetail[];
  options: any[];
}

export enum Type {
  Comment = "comment",
  Story = "story",
}