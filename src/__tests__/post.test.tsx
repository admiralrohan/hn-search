import { render, screen, within } from "@testing-library/react";
import Post from "../../pages/post/[id]";
import { PostDetail } from "../interfaces/post-detail";

const dummyPost: PostDetail = {
  id: 20052623,
  created_at: "2019-05-30T16:09:19.000Z",
  created_at_i: 1559232559,
  type: "story",
  author: "WisNorCan",
  title: "Switch from Chrome to Firefox",
  url: "https://www.mozilla.org/en-US/firefox/switch/",
  text: null,
  points: 3287,
  parent_id: null,
  story_id: null,
  children: [
    {
      id: 20057600,
      created_at: "2019-05-31T01:38:05.000Z",
      created_at_i: 1559266685,
      type: "comment",
      author: "PatrolX",
      title: null,
      url: null,
      text: "<p>Very impressed with FF 67, I&#x27;ve stopped using Chrome.</p><p>The sync between devices is very well done.</p>",
      points: null,
      parent_id: 20052623,
      story_id: 20052623,
      children: [],
      options: [],
    },
    {
      id: 20058629,
      created_at: "2019-05-31T06:18:13.000Z",
      created_at_i: 1559283493,
      type: "comment",
      author: "humility",
      title: null,
      url: null,
      text: '<p>I seriously don&#x27;t understand why people have been gravitating towards Chrome for years despite Google being synonymous with surveillance, even on Linux. Google chrome is the fifth most popular download on Arch User Repository[1].</p><p>Alternatives like ungoogled chromium exist, but aren&#x27;t as powerful&#x2F;stable as the real thing, so why not use Firefox. Call me overly optimistic, but augmenting the firefox&#x2F;mozilla community with participating&#x2F;privacy conscious users can only lead to good down the line.</p><p>1. <a href="https:&#x2F;&#x2F;aur.archlinux.org&#x2F;packages&#x2F;" rel="nofollow">https:&#x2F;&#x2F;aur.archlinux.org&#x2F;packages&#x2F;</a></p>',
      points: null,
      parent_id: 20052623,
      story_id: 20052623,
      children: [
        {
          id: 20058992,
          created_at: "2019-05-31T07:52:27.000Z",
          created_at_i: 1559289147,
          type: "comment",
          author: "mda",
          title: null,
          url: null,
          text: "<p>Fwiw, I don&#x27;t see it as surveillance, it is trusting your data with them, might seem similar but a little bit different. Google in general a very good steward of private data if not the best. They don&#x27;t sell it and provide tools to manage it So far I find it an acceptable bargain.</p><p>As for Chrome, the latest announcement is a bit troublesome, but i still find it better than alternatives.</p>",
          points: null,
          parent_id: 20058629,
          story_id: 20052623,
          children: [],
          options: [],
        },
      ],
      options: [],
    },
  ],
  options: [],
};

describe("Post details", () => {
  it("Rendered properly", () => {
    render(<Post data={dummyPost} />);

    const main = screen.getByRole("main");

    expect(
      within(main).getByText(/Switch from Chrome to Firefox/i)
    ).toBeInTheDocument();
    expect(
      within(main)
        .getByText(/Switch from Chrome to Firefox/i)
        .closest("a")
    ).toHaveAttribute("href", "https://www.mozilla.org/en-US/firefox/switch/");

    expect(
      within(main).getByText(
        "3287 points by WisNorCan on May 30 2019 | 2 comments"
      )
    ).toBeInTheDocument();

    const listItems = within(main).getAllByRole("listitem");
    expect(listItems.length).toBe(3);

    expect(
      within(listItems[0]).getByText("PatrolX on May 31 2019")
    ).toBeInTheDocument();
    expect(
      within(listItems[0]).getByText(
        "Very impressed with FF 67, I've stopped using Chrome."
      )
    ).toBeInTheDocument();

    expect(
      within(listItems[1]).getByText("humility on May 31 2019")
    ).toBeInTheDocument();
    expect(
      within(listItems[1]).getByText(
        /I seriously don't understand why people have been gravitating towards Chrome/i
      )
    ).toBeInTheDocument();

    expect(
      within(listItems[2]).getByText("mda on May 31 2019")
    ).toBeInTheDocument();
    expect(
      within(listItems[2]).getByText(
        /Fwiw, I don't see it as surveillance, it is trusting your data with them/i
      )
    ).toBeInTheDocument();
  });
});
