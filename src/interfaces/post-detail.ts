export interface PostDetail {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
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
