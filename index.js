import { SimpleDB } from "simple-data-analysis";
import { prettyDuration } from "journalism";

const start = new Date();

const sdb = new SimpleDB();
const table = sdb.newTable();

await table.loadData("./measurements.txt", {
  fileType: "csv",
  header: false,
});
await table.renameColumns({ column0: "city", column1: "temp" });
await table.logTable();

await table.summarize({
  values: "temp",
  categories: "city",
  summaries: ["min", "mean", "max"],
  decimals: 1,
});
await table.logTable();

prettyDuration(start, { log: true, prefix: "Done in " });
