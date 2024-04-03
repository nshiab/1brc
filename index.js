import { SimpleNodeDB } from "simple-data-analysis";
import { prettyDuration } from "journalism";

const start = new Date();

const sdb = new SimpleNodeDB();

await sdb.loadData("data", "./measurements.txt", {
  fileType: "csv",
  header: false,
});
await sdb.renameColumns("data", { column0: "city", column1: "temp" });
await sdb.summarize("data", {
  values: "temp",
  categories: "city",
  summaries: ["min", "mean", "max"],
  decimals: 1,
});
await sdb.logTable("data");

console.log("Finished in " + prettyDuration(start, new Date()));
