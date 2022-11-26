export interface SearchResult {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: Query;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  created_at: Date;
  title: string;
  url: string | null;
  author: string;
  points: number;
  story_text: null;
  comment_text: null;
  num_comments: number;
  story_id: null;
  story_title: null;
  story_url: null;
  parent_id: null;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  title: Author;
  url: Author;
  author: Author;
}

export interface Author {
  value: string;
  matchLevel: MatchLevel;
  matchedWords: Query[];
  fullyHighlighted?: boolean;
}

export enum MatchLevel {
  Full = "full",
  None = "none",
}

export enum Query {
  Web3 = "web3",
}

export interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  fetch: Fetch;
  total: number;
}

export interface AfterFetch {
  total: number;
}

export interface Fetch {
  scanning: number;
  total: number;
}
