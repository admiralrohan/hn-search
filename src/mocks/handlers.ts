import { rest } from "msw";
import { BASE_URL } from "../constants";
import { SearchResult } from "../interfaces/search-result";

export const handlers = [
  rest.get(`${BASE_URL}/v1/search`, (req, res, ctx) => {
    const pageNo = Number(req.url.searchParams.get("page"));
    const query = req.url.searchParams.get("query")?.toLowerCase() as string;

    let response: SearchResult = {
      hits: [
        {
          created_at: "2018-03-14T03:50:30.000Z",
          title: "Stephen Hawking has died",
          url: "http://www.bbc.com/news/uk-43396008",
          author: "Cogito",
          points: 6015,
          story_text: null,
          comment_text: null,
          num_comments: 436,
          story_id: null,
          story_title: null,
          story_url: null,
          parent_id: null,
          created_at_i: 1520999430,
          relevancy_score: 8012,
          _tags: ["story", "author_Cogito", "story_16582136"],
          objectID: "16582136",
          _highlightResult: {
            title: {
              value: "Stephen Hawking has died",
              matchLevel: "none",
              matchedWords: [],
            },
            url: {
              value: "http://www.bbc.com/news/uk-43396008",
              matchLevel: "none",
              matchedWords: [],
            },
            author: {
              value: "Cogito",
              matchLevel: "none",
              matchedWords: [],
            },
          },
        },
        {
          created_at: "2016-02-17T08:38:37.000Z",
          title: "A Message to Our Customers",
          url: "http://www.apple.com/customer-letter/",
          author: "epaga",
          points: 5771,
          story_text: null,
          comment_text: null,
          num_comments: 967,
          story_id: null,
          story_title: null,
          story_url: null,
          parent_id: null,
          created_at_i: 1455698317,
          relevancy_score: 6561,
          _tags: ["story", "author_epaga", "story_11116274"],
          objectID: "11116274",
          _highlightResult: {
            title: {
              value: "A Message to Our Customers",
              matchLevel: "none",
              matchedWords: [],
            },
            url: {
              value: "http://www.apple.com/customer-letter/",
              matchLevel: "none",
              matchedWords: [],
            },
            author: {
              value: "epaga",
              matchLevel: "none",
              matchedWords: [],
            },
          },
        },
      ],
      nbHits: 31384549,
      page: 0,
      nbPages: 50,
      hitsPerPage: 2,
      exhaustiveNbHits: true,
      exhaustiveTypo: true,
      exhaustive: {
        nbHits: true,
        typo: true,
      },
      query: "",
      params:
        "advancedSyntax=true&analytics=true&analyticsTags=backend&page=0&query=",
      processingTimeMS: 1,
      processingTimingsMS: {
        afterFetch: {
          total: 1,
        },
        total: 1,
      },
    };

    // Most of the properties are unchanged and also irrelevant. So just overriding the `hits` property
    if (query === "web3") {
      response = {
        ...response,
        ...{
          hits: [
            {
              created_at: "2022-01-07T21:41:56.000Z",
              title: "My First Impressions of Web3",
              url: "https://moxie.org/2022/01/07/web3-first-impressions.html",
              author: "natdempk",
              points: 3393,
              story_text: null,
              comment_text: null,
              num_comments: 1129,
              story_id: null,
              story_title: null,
              story_url: null,
              parent_id: null,
              created_at_i: 1641591716,
              _tags: ["story", "author_natdempk", "story_29845208"],
              objectID: "29845208",
              _highlightResult: {
                title: {
                  value: "My First Impressions of <em>Web3</em>",
                  matchLevel: "full",
                  fullyHighlighted: false,
                  matchedWords: ["web3"],
                },
                url: {
                  value:
                    "https://moxie.org/2022/01/07/<em>web3</em>-first-impressions.html",
                  matchLevel: "full",
                  fullyHighlighted: false,
                  matchedWords: ["web3"],
                },
                author: {
                  value: "natdempk",
                  matchLevel: "none",
                  matchedWords: [],
                },
              },
            },
            {
              created_at: "2022-03-23T03:12:40.000Z",
              title: "Web3 is centralized and inefficient",
              url: "https://www.neelc.org/posts/web3-centralized/",
              author: "neelc",
              points: 801,
              story_text: null,
              comment_text: null,
              num_comments: 749,
              story_id: null,
              story_title: null,
              story_url: null,
              parent_id: null,
              created_at_i: 1648005160,
              _tags: ["story", "author_neelc", "story_30774457"],
              objectID: "30774457",
              _highlightResult: {
                title: {
                  value: "<em>Web3</em> is centralized and inefficient",
                  matchLevel: "full",
                  fullyHighlighted: false,
                  matchedWords: ["web3"],
                },
                url: {
                  value:
                    "https://www.neelc.org/posts/<em>web3</em>-centralized/",
                  matchLevel: "full",
                  fullyHighlighted: false,
                  matchedWords: ["web3"],
                },
                author: {
                  value: "neelc",
                  matchLevel: "none",
                  matchedWords: [],
                },
              },
            },
          ],
        },
      };
    }

    if (pageNo > 0) {
      response = {
        ...response,
        ...{
          nbHits: 31421130,
          page: 1,
          hits: [
            {
              created_at: "2019-05-30T16:09:19.000Z",
              title: "Switch from Chrome to Firefox",
              url: "https://www.mozilla.org/en-US/firefox/switch/",
              author: "WisNorCan",
              points: 3287,
              story_text: null,
              comment_text: null,
              num_comments: 981,
              story_id: null,
              story_title: null,
              story_url: null,
              parent_id: null,
              created_at_i: 1559232559,
              relevancy_score: 8859,
              _tags: ["story", "author_WisNorCan", "story_20052623"],
              objectID: "20052623",
              _highlightResult: {
                title: {
                  value: "Switch from Chrome to Firefox",
                  matchLevel: "none",
                  matchedWords: [],
                },
                url: {
                  value: "https://www.mozilla.org/en-US/firefox/switch/",
                  matchLevel: "none",
                  matchedWords: [],
                },
                author: {
                  value: "WisNorCan",
                  matchLevel: "none",
                  matchedWords: [],
                },
              },
            },
          ],
        },
      };
    }

    return res(ctx.status(200), ctx.json<SearchResult>(response));
  }),
];
