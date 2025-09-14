import { parseCSV } from "./basic-parser";
import { z, ZodType } from "zod";

// /*
//   Example of how to run the parser outside of a test suite.
// */

// const DATA_FILE = "./data/people.csv"; // update with your actual file name

// async function main() {
//   // Because the parseCSV function needs to "await" data, we need to do the same here.
//   const results = await parseCSV(DATA_FILE)

//   // Notice the difference between "of" and "in". One iterates over the entries, 
//   // another iterates over the indexes only.
//   for(const record of results)
//     console.log(record)
//   for(const record in results)
//     console.log(record)
// }

// main();



/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name

async function main() {
  const personSchema = z.object({
  name: z.string(),
  age: z.string().refine((val) => !isNaN(Number(val))),
});

  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, personSchema);

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  if(results && "validRows" in results)
    for(const record of results.validRows)
      console.log(record)
  else for(const record in results)
      console.log(record)
}
main();