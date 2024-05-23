import { GetClosure } from "./closure"
import { GetNthFibo } from "./fibo"
import { GetMinMax } from "./minmax"
import { GetPrintOdd } from "./printodd"
import { GetRecursive } from "./recursive"
import { GetSleep } from "./sleep"

// Load predefined codes
const fiboCode = GetNthFibo()
const minAndMaxCode = GetMinMax()
const sleepCode = GetSleep()
const printOddCode = GetPrintOdd()
const closureCode = GetClosure()
const recursiveCode = GetRecursive()

export const predefinedCodeOptions = () => [
  {
    value: "empty",
    text: "Empty Editor"
  },
  {
    value: "fibo",
    text: "Nth Fibonacci Number"
  },
  {
    value: "minmax",
    text: "Min and Max"
  },
  {
    value: "printodd",
    text: "Print Odd Numbers"
  },
  {
    value: "closure",
    text: "Closure"
  },
  {
    value: "recursive",
    text: "Recursion"
  },
];

export function changePredefinedCode(e: any, callback: any) {
  if (e.target.value == "empty") {
    callback("# Hey there, welcome!");
  }
  if (e.target.value == "fibo") {
    callback(fiboCode);
  }
  if (e.target.value == "minmax") {
    callback(minAndMaxCode);
  }
  if (e.target.value == "sleep") {
    callback(sleepCode);
  }
  if (e.target.value == "printodd") {
    callback(printOddCode);
  }
  if (e.target.value == "closure") {
    callback(closureCode);
  }
  if (e.target.value == "recursive") {
    callback(recursiveCode);
  }
};