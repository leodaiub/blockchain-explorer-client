import { renderHook } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { useConvertToBTC } from "../utilities";

const server = setupServer(
  rest.get("https://api.example.com/tickers", (req, res, ctx) => {
    return res(
      ctx.json({
        USD: { last: 40000 },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("@/store", () => ({
  useStore: jest.fn((selector) => selector({ currency: "USD" })),
}));

describe("useConvertToBTC", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct converted amount", async () => {
    jest.fn().mockReturnValue({ currency: "USD" });

    const { result } = renderHook(() => useConvertToBTC());
    const { convertFromBTC } = result.current;

    const amountInBTC = 0.5;
    let convertedAmount;

    convertedAmount = convertFromBTC(amountInBTC);

    expect(convertedAmount).toEqual("$20,000.00");
  });

  it("should handle missing tickers data", async () => {
    jest.fn().mockReturnValue({ currency: "USD" });

    server.use(
      rest.get("https://api.example.com/tickers", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "Internal Server Error",
          })
        );
      })
    );

    const { result } = renderHook(() => useConvertToBTC());
    const { convertFromBTC } = result.current;

    const amountInBTC = 0.5;
    let convertedAmount;

    convertedAmount = convertFromBTC(amountInBTC);

    expect(convertedAmount).toEqual("$NaN");
  });
});
