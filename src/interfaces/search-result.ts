export interface SearchResult {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  created_at: string;
  title: string | null;
  url: string | null;
  author: string;
  points: number;
  relevancy_score?: number;
  story_text: string | null;
  comment_text: null;
  num_comments: number | null;
  story_id: null;
  story_title: null;
  story_url: null;
  parent_id: number | null;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  title?: MatchedResult;
  url?: MatchedResult;
  author?: MatchedResult;
  story_text?: MatchedResult;
}

export interface MatchedResult {
  value: string;
  matchLevel: string;
  matchedWords: string[];
  fullyHighlighted?: boolean;
}

export interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  fetch?: Fetch;
  total: number;
}

export interface AfterFetch {
  total: number;
}

export interface Fetch {
  scanning: number;
  total: number;
}
