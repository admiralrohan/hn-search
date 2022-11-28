import { render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/setup/setup";
import { getArrayRange } from "../utils/get-array-range";

function setup({ currentPage }: { currentPage: number }): {
  setPage: any;
  user: UserEvent;
} {
  const setPage = jest.fn();
  const user = userEvent.setup();

  render(
    <Pagination
      currentPage={currentPage}
      setPage={setPage}
      highestPossiblePage={19}
    />
  );

  return { setPage, user };
}

describe("Pagination", () => {
  it("All buttons loaded properly for initial rendering", () => {
    setup({ currentPage: 0 });

    getArrayRange(1, 6).forEach((pageNo) => {
      expect(screen.queryByText(pageNo)).toBeInTheDocument();
    });
    expect(screen.queryByText(7)).not.toBeInTheDocument();
    expect(screen.queryByText(/first/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last/i)).toBeInTheDocument();
  });

  it("Clicking on same page would trigger page change", async () => {
    const { setPage, user } = setup({ currentPage: 0 });

    await user.click(screen.getByText(3));
    expect(setPage).toBeCalledTimes(1);
    expect(setPage).toBeCalledWith(2);
  });

  it("Adds `.active` class properly", async () => {
    setup({ currentPage: 10 });

    getArrayRange(6, 10).forEach((pageNo) => {
      expect(screen.getByText(pageNo)).not.toHaveClass("active");
    });
    expect(screen.getByText(11)).toHaveClass("active");
    getArrayRange(12, 16).forEach((pageNo) => {
      expect(screen.getByText(pageNo)).not.toHaveClass("active");
    });
  });

  it("All buttons loaded properly after clicking on some page", () => {
    setup({ currentPage: 2 });

    getArrayRange(1, 8).forEach((pageNo) => {
      expect(screen.queryByText(pageNo)).toBeInTheDocument();
    });
    expect(screen.queryByText(9)).not.toBeInTheDocument();
    expect(screen.queryByText(/first/i)).toBeInTheDocument();
    expect(screen.queryByText(/last/i)).toBeInTheDocument();
  });

  it("All buttons loaded properly for middle page", () => {
    setup({ currentPage: 10 });

    getArrayRange(6, 16).forEach((pageNo) => {
      expect(screen.queryByText(pageNo)).toBeInTheDocument();
    });
    expect(screen.queryByText(5)).not.toBeInTheDocument();
    expect(screen.queryByText(17)).not.toBeInTheDocument();
    expect(screen.queryByText(/first/i)).toBeInTheDocument();
    expect(screen.queryByText(/last/i)).toBeInTheDocument();
  });

  it("All buttons loaded properly for ending page", () => {
    setup({ currentPage: 18 });

    getArrayRange(14, 20).forEach((pageNo) => {
      expect(screen.queryByText(pageNo)).toBeInTheDocument();
    });
    expect(screen.queryByText(13)).not.toBeInTheDocument();
    expect(screen.queryByText(/first/i)).toBeInTheDocument();
    expect(screen.queryByText(/last/i)).toBeInTheDocument();
  });

  it("All buttons loaded properly for last page", () => {
    setup({ currentPage: 20 });

    getArrayRange(16, 20).forEach((pageNo) => {
      expect(screen.queryByText(pageNo)).toBeInTheDocument();
    });
    expect(screen.queryByText(15)).not.toBeInTheDocument();
    expect(screen.queryByText(/first/i)).toBeInTheDocument();
    expect(screen.queryByText(/last/i)).not.toBeInTheDocument();
  });
});
