import { Context, logging, storage, PersistentMap, u128 } from "near-sdk-as";

const DEFAULT_TICKETS = 0;
export const TicketsUser = new PersistentMap<string, i32>("Ticket's Users");

/* ---------------- Vew Methods ----------------- */
//Obtener los tickets
export function getTickets(accountId: string): i32 {
  return TicketsUser.getSome(accountId);
}

/*----------------Change Methods----------------- */

//Comprar tickets con near
export function buyTickets(amount: i32): void {
  const accountId = Context.sender;
  const entriesNumber: i32 = amount * 10;
  logging.log(`Saving "${entriesNumber}" tickets for account "${accountId}"`);
  TicketsUser.set(accountId, entriesNumber);
}

//La recompenza del juego sera el doble miestras si pierde, perdera lo apostado
export function playGame(accountId: string, amount: i32): string {
  //Se obtiene el balance del usuario
  const balance: i32 = TicketsUser.getSome(accountId);
  //verificamos que tenga los tickets suficientes
  //Obtenemos el numero aleatoria
  const randomNumber: i32 = getRandomInt(0, 100);

  if (balance - amount < 0) {
    logging.log("El balance no es suficiente. Compra mas tickets");
    return "null";
  } else {
    //Si el jugador pierde, se restan los tickets
    if (randomNumber > 0 && randomNumber <= 45) {
      TicketsUser.set(accountId, balance + amount);
      return "win";
    } else {
      //Si el jugador gana se suman los tickets
      TicketsUser.set(accountId, balance - amount);
      return "lose";
    }
  }
}

/* ----------------- Utils Methods ------------------- */

//Generar un numero aleatorio
function getRandomInt(min: number, max: number): i32 {
  min = Math.ceil(min);
  max = Math.floor(max);
  return i32(Math.floor(Math.random() * (max - min + 1)) + min);
}
