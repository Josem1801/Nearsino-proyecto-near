import { storage, Context, logging } from "near-sdk-as";
import { getTickets, buyTickets, TicketsUser, playGame } from "../index";
describe("Testing Game ", () => {
  it("should be return 0 if there aren't tickets", () => {
    const tickets = getTickets(Context.sender);
    expect(tickets).toBe(0);
  });

  it("should be buy tickets and get * 10 tickets", () => {
    buyTickets(10);
    const tickets = getTickets(Context.sender);
    expect(tickets).toBe(100);
  });

  it("should return null if the balance is less than the amount", () => {
    buyTickets(10);
    expect(playGame(Context.sender, 115)).toBe("null");
  });

  it("should add the points if the player wins and if lose, take away the tickets", () => {
    buyTickets(10);
    const balance = TicketsUser.getSome(Context.sender);
    const ticketToPlay = 100;
    const resultGame = playGame(Context.sender, ticketToPlay);

    if (resultGame === "null") {
      const result = balance;
      expect(result).toBe(TicketsUser.getSome(Context.sender));
      expect(resultGame).toBe("null");
    }
    if (resultGame === "win") {
      const result = balance + ticketToPlay;
      expect(result).toBe(TicketsUser.getSome(Context.sender));
      expect(resultGame).toBe("win");
    }
    if (resultGame === "lose") {
      const result = balance - ticketToPlay;
      expect(result).toBe(TicketsUser.getSome(Context.sender));
      expect(resultGame).toBe("lose");
    }
  });
});
