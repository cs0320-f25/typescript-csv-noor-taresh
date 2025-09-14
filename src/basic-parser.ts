import { getRandomValues } from "crypto";
import * as fs from "fs";
import * as readline from "readline";

import { string, z, ZodType, ZodIssue} from "zod";

// /**
//  * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
//  * function for others to use. Most modern editors will show the comment when 
//  * mousing over this function name. Try it in run-parser.ts!
//  * 
//  * File I/O in TypeScript is "asynchronous", meaning that we can't just
//  * read the file and return its contents. You'll learn more about this 
//  * in class. For now, just leave the "async" and "await" where they are. 
//  * You shouldn't need to alter them.
//  * 
//  * @param path The path to the file being loaded.
//  * @returns a "promise" to produce a 2-d array of cell values
//  */
// export async function parseCSV(path: string): Promise<string[][]> {
//   // This initial block of code reads from a file in Node.js. The "rl"
//   // value can be iterated over in a "for" loop. 
//   const fileStream = fs.createReadStream(path);
//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity, // handle different line endings
//   });
  
//   // Create an empty array to hold the results
//   let result = []
  
//   // We add the "await" here because file I/O is asynchronous. 
//   // We need to force TypeScript to _wait_ for a row before moving on. 
//   // More on this in class soon!
//   for await (const line of rl) {
//     const values = line.split(",").map((v) => v.trim());
//     result.push(values)
//   }
//   console.log(result);
//   return result
// }





// export async function parseCSV(path: string, schema?: ZodType<any>
// ): Promise<{ validRows: any[]; errors: { row: number; issues: z.ZodIssue[] }[]} | string[][]> {

//   // This initial block of code reads from a file in Node.js. The "rl"
//   // value can be iterated over in a "for" loop. 
//   const fileStream = fs.createReadStream(path);
//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity, // handle different line endings
//   });
  
//   const prevResult: string[][] = [];

//   // Create an empty array to hold the results
//   const result = {
//     validRows: [] as any[],
//     errors: [] as { row: number; issues: z.ZodIssue[] }[],
//   };
//   let rowNumber = 0;

//   const headers: string[] = []
//   if ("validRows" in result) {
//   for (const record of result.validRows) {
//     console.log(record);
//   }
// } else {
//   for (const row of prevResult) {
//     console.log(row);
//   }
// }

//   // We add the "await" here because file I/O is asynchronous. 
//   // We need to force TypeScript to _wait_ for a row before moving on. 
//   // More on this in class soon!
//   for await (const line of rl) {
//     rowNumber++;
//     const values = line.split(",").map((v) => v.trim());
    
//     if(!headers){
//     continue
//     }
//     if (!schema) {
//       return { validRows: prevResult, errors: [] };
//     }
//     const obj: Record<string, string> = {}
//     headers.forEach((h, i) => {
//       obj[h] = values[i]
//     })
//     const parsed = schema.safeParse(obj)
//     if (parsed.success) {
//       result.validRows.push(parsed.data)
//     } else {
//       result.errors.push({ row: rowNumber, issues: parsed.error.issues });
//     }
//   }

//   console.log(result);
//   return schema ? result : prevResult;
// }



export async function parseCSV<T>(path: string,schema?: ZodType<T>
): Promise<{ validRows: (T | string[])[]; errors: { row: number; issues: ZodIssue[] }[] } | string[][]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const result: { validRows: (T | string[])[]; errors: { row: number; issues: ZodIssue[] }[] } = {
    validRows: [],
    errors: [],
  };

  let headers: string[] | null = null;
  let rowNumber = 0;

  for await (const line of rl) {
    rowNumber++;
    const values = line.split(",").map((v) => v.trim());

    if (!headers) {
      headers = values;
      // if (!schema) result.validRows.push(values); 
        continue;
    }

    if (!schema) {
      result.validRows.push(values);
      continue;
    }

    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = values[i]));

    const parsed = schema.safeParse(obj);
    if (parsed.success) {
      result.validRows.push(parsed.data);
    } else {
      result.errors.push({ row: rowNumber, issues: parsed.error.issues });
    }
  }
  return result;
}