import {
  Context,
  logging,
  PersistentMap,
  PersistentVector,
  RNG,
} from "near-sdk-as";

export const Games = new PersistentVector<i32>("m");
export const TicketsUser = new PersistentMap<string, i32>("TicketsUser");

/* ---------------- Vew Methods ----------------- */
//Obtener los tickets
export function getTickets(accountId: string): i32 {
  if (TicketsUser.contains(accountId)) {
    return TicketsUser.getSome(accountId);
  }
  return i32(0);
}

//Obtener los tickets
export function getLastGame(): i32 {
  if (Games.length > 0) {
    return Games[Games.length - 1];
  }
  return 404;
}

/*----------------Change Methods----------------- */

//Comprar tickets con near
export function buyTickets(amount: i32): void {
  const accountId = Context.sender;
  const balance: i32 = TicketsUser.getSome(accountId);
  const entriesNumber: i32 = amount * 10;
  logging.log(`Saving "${entriesNumber}" tickets for account "${accountId}"`);

  TicketsUser.set(accountId, balance + entriesNumber);
}

//La recompenza del juego sera el doble miestras si pierde, perdera lo apostado
export function playGame(accountId: string, amount: i32): i32 {
  //Se obtiene el balance del usuario
  const balance: i32 = TicketsUser.getSome(accountId);
  //verificamos que tenga los tickets suficientes
  //Obtenemos el numero aleatoria
  const random = new RNG<u32>(2, 100);
  const randomNumber: i32 = random.next();

  if (balance - amount < 0) {
    logging.log("El balance no es suficiente. Compra mas tickets");
    return 404;
  } else {
    //Si el jugador pierde, se restan los tickets
    if (randomNumber > 0 && randomNumber <= 45) {
      TicketsUser.set(accountId, balance + amount);
      Games.push(1);
      return 1;
    }
    //Si el jugador gana se suman los tickets
    TicketsUser.set(accountId, balance - amount);
    Games.push(0);
    return 0;
  }
}
