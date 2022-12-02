import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import Home from "../../pages/index";
import { BASE_URL } from "../constants";
import { server } from "../mocks/server";

describe("Home", () => {
  it("Shows loader after rendering", () => {
    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("Shows data after API response come from API", async () => {
    render(<Home />);
    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(9);

    expect(
      within(listItems[0]).getByText("Stephen Hawking has died")
    ).toBeInTheDocument();
    expect(
      within(listItems[0]).getByText("Stephen Hawking has died").closest("a")
    ).toHaveAttribute("href", "/post/16582136");
    expect(within(listItems[0]).getByText(/points/i)).toHaveTextContent(
      /6015 points/i
    );
    expect(within(listItems[0]).getByText(/cogito/i)).toBeInTheDocument();
    expect(within(listItems[0]).getByText(/5 years ago/i)).toBeInTheDocument();
    expect(within(listItems[0]).getByText(/comment/i)).toHaveTextContent(
      /436 comments/i
    );

    expect(
      within(listItems[1]).getByText("A Message to Our Customers")
    ).toBeInTheDocument();

    expect(within(listItems[2]).getByText("1")).toBeInTheDocument();
    expect(within(listItems[3]).getByText("2")).toBeInTheDocument();
    expect(within(listItems[4]).getByText("3")).toBeInTheDocument();
    expect(within(listItems[5]).getByText("4")).toBeInTheDocument();
    expect(within(listItems[6]).getByText("5")).toBeInTheDocument();
    expect(within(listItems[7]).getByText("6")).toBeInTheDocument();
    expect(within(listItems[8]).getByTitle(/last page/i)).toBeInTheDocument();
  });

  it("Shows proper message for empty response", async () => {
    server.use(
      rest.get(`${BASE_URL}/v1/search`, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ hits: [] }));
      })
    );

    render(<Home />);
    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);

    expect(screen.getByText(/no result found/i)).toBeInTheDocument();
  });

  it("Shows proper message for error response", async () => {
    server.use(
      rest.get(`${BASE_URL}/v1/search`, async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({}));
      })
    );

    render(<Home />);
    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("Search working properly", async () => {
    jest.useFakeTimers({ advanceTimers: true });

    const user = userEvent.setup();
    render(<Home />);
    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const searchbox = screen.getByRole("searchbox");

    // Testing debounce feature
    await act(async () => {
      await user.type(searchbox, "w");
      jest.advanceTimersByTime(100);
      expect(
        screen.queryByText("Stephen Hawking has died")
      ).toBeInTheDocument();

      await user.type(searchbox, "eb");
      jest.advanceTimersByTime(100);
      expect(
        screen.queryByText("Stephen Hawking has died")
      ).toBeInTheDocument();

      await user.type(searchbox, "3");
      jest.advanceTimersByTime(300);
      // 500ms passed in total but not since the last typing
      expect(
        screen.queryByText("Stephen Hawking has died")
      ).toBeInTheDocument();

      jest.advanceTimersByTime(200);
    });

    expect(
      screen.queryByText("Stephen Hawking has died")
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(9);

    expect(
      within(listItems[0]).getByText("My First Impressions of Web3")
    ).toBeInTheDocument();
    expect(
      within(listItems[0])
        .getByText("My First Impressions of Web3")
        .closest("a")
    ).toHaveAttribute("href", "/post/29845208");
    expect(within(listItems[0]).getByText(/points/i)).toHaveTextContent(
      /3393 points/i
    );
    expect(within(listItems[0]).getByText(/natdempk/i)).toBeInTheDocument();
    expect(
      within(listItems[0]).getByText(/11 months ago/i)
    ).toBeInTheDocument();
    expect(within(listItems[0]).getByText(/comment/i)).toHaveTextContent(
      /1129 comments/i
    );

    expect(
      within(listItems[1]).getByText("Web3 is centralized and inefficient")
    ).toBeInTheDocument();

    expect(within(listItems[2]).getByText("1")).toBeInTheDocument();
    expect(within(listItems[3]).getByText("2")).toBeInTheDocument();
    expect(within(listItems[4]).getByText("3")).toBeInTheDocument();
    expect(within(listItems[5]).getByText("4")).toBeInTheDocument();
    expect(within(listItems[6]).getByText("5")).toBeInTheDocument();
    expect(within(listItems[7]).getByText("6")).toBeInTheDocument();
    expect(within(listItems[8]).getByTitle(/last page/i)).toBeInTheDocument();

    jest.useRealTimers();
  });

  it("Pagination working properly", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const linkToSecondPage = screen.getByText("2");
    await user.click(linkToSecondPage);

    expect(
      screen.queryByText("Stephen Hawking has died")
    ).not.toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(10);

    expect(
      within(listItems[0]).getByText("Switch from Chrome to Firefox")
    ).toBeInTheDocument();
    expect(
      within(listItems[0])
        .getByText("Switch from Chrome to Firefox")
        .closest("a")
    ).toHaveAttribute("href", "/post/20052623");
    expect(within(listItems[0]).getByText(/points/i)).toHaveTextContent(
      /3287 points/i
    );
    expect(within(listItems[0]).getByText(/WisNorCan/i)).toBeInTheDocument();
    expect(within(listItems[0]).getByText(/4 years ago/i)).toBeInTheDocument();
    expect(within(listItems[0]).getByText(/comment/i)).toHaveTextContent(
      /981 comments/i
    );

    expect(within(listItems[1]).getByTitle(/first page/i)).toBeInTheDocument();
    expect(within(listItems[2]).getByText("1")).toBeInTheDocument();
    expect(within(listItems[3]).getByText("2")).toBeInTheDocument();
    expect(within(listItems[4]).getByText("3")).toBeInTheDocument();
    expect(within(listItems[5]).getByText("4")).toBeInTheDocument();
    expect(within(listItems[6]).getByText("5")).toBeInTheDocument();
    expect(within(listItems[7]).getByText("6")).toBeInTheDocument();
    expect(within(listItems[8]).getByText("7")).toBeInTheDocument();
    expect(within(listItems[9]).getByTitle(/last page/i)).toBeInTheDocument();
  });
});
