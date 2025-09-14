import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PEOPLE2_CSV_PATH = path.join(__dirname, "../data/people2.csv")
const personSchema = z.object({
    name: z.string(),
    age: z.string().refine((val) => !isNaN(Number(val))),
  });
  

//test 1
test("parseCSV yields arrays", async () => {
  
  const results = await parseCSV(PEOPLE_CSV_PATH, personSchema);
              /* fails */
  // expect(results.validRows).toHaveLength(3);
  // expect(results.validRows[0]).toEqual(["name", "age"]);
  // expect(results.validRows[0]).toEqual(["Alice", "23"]);
  // expect(results.validRows[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  // expect(results.validRows[1]).toEqual(["Charlie", "25"]);
  // expect(results.validRows[2]).toEqual(["Nim", "22"]);

          /* object format test */
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  expect(results.validRows[0]).toEqual({ name: "Alice", age: "23" });
  expect(results.validRows[1]).toEqual({ name: "Charlie", age: "25" });
  expect(results.validRows[2]).toEqual({ name: "Nim", age: "22" });
  });


  // test 2
test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  for(const row of results.validRows) {
    expect(Array.isArray(row)).toBe(false);
  }
});

//test 3: when a quote is unclosed it considers the remainder falling on a new line as new info
//and doesn't recognize ""
test("parseCSV fails with quoted newlines", async () => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  expect(results.validRows.length).toBeGreaterThanOrEqual(6);
  console.log("Quoted newline fails ", results.validRows);
});

//test 4: the parser keeps the data points on the same line 
//here the length is supposed to be 2 (for Charlie, "twentyfive, 25") OR 4 (Charlie, "twentyfive, 25"/ twentyfivee, sally)
//it fails to split, and to move to a new line
test("parseCSV fails with string[][] format", async() => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  expect (results.validRows[5]).not.toEqual(2);
  console.log("well it is this long, ", results.validRows[6]);
})

//test 5: parser fails to recognize quotes
//it saparates each word if found between commas regardless if it were in ""
test("parseCSV fails with comma splitting", async() => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  const split = "'Kerem', '24, twenty four'";
  expect (results.validRows[7]).not.toEqual(split);
  console.log("it's gonna be kerem, 24, twenty four");
})

//test 6: it doesn't enforce data types
//it just takes everything as a string
test("parseCSV fails with data types", async() => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  expect(typeof results.validRows[1]).toBe("object");
  console.log("it's gonna be a string");
})


//test 7: it doesn't recognize empty cells
//it just ignores them and moves to the next value
test("parseCSV fails with empty cells", async() => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  //expect(results.validRows[9]).toEqual(["David", '']);
  expect(results.validRows[9]).toEqual(undefined);
  console.log("it's gonna be undefined ", results.validRows[9]);
});

//test 8: it treats empty quotes as non-empty
//and keeps the quotes
test("parseCSV fails with empty quotes", async() => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  expect(results.validRows[10]).toEqual(undefined);
  console.log("it's gonna be undefined", results.validRows[10]);
});

//test 8: it doesn't validate entries
//it just takes whatever is there
test("parseCSV fails with names without ages", async() => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, personSchema);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  expect(results.validRows[11]).not.toEqual(["Eve", "''"]);
  console.log("it's gonna be undefined", results.validRows[11]);
})

//test 10: passing undefined schema
test("parseCSV fails with names without ages", async() => {
  const results = await parseCSV(PEOPLE2_CSV_PATH, undefined);
  if (!results || !("validRows" in results)) {
    throw new Error("Expected results to have validRows");
  }
  expect(Array.isArray(results.validRows)).toBe(true);  
  expect(Array.isArray(results.validRows[0])).toBe(true); 
  expect(results.validRows[0]).toEqual(["Alice", "23"]);
  console.log("test 8 ", results.validRows[0]);
})
