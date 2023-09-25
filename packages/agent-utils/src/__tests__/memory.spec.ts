import dotenv from "dotenv";
import path from "path";
import { Chroma } from "../agent/memory";
// import { executeAgentFunction } from "../agent";
// import { SCRIPT_WRITER, seedChromaDB } from "../memory/feed";

dotenv.config({
  path: path.join(__dirname, "../../../../.env"),
});

describe("Chroma Vector Database", () => {
  // const ONE_MINUTE_TIMEOUT = 300 * 1000;

  test(`Execute`, async () => {
    const chroma = new Chroma(
      "evo",
      process.env.OPENAI_API_KEY as string
    );

    // await seedChromaDB(chroma, SCRIPT_WRITER)

    // Try querying for a specific text
    // const queryResults = await chroma.get("Create a brief report or summary highlighting how one or more companies from companies.txt are addressing or capitalizing on challenges or trends from challenges.txt. Write a file called output.txt.");
    const queryResults = await chroma.get(
      "write 'hello world!' into hello.txt"
    );
    console.log(queryResults);

    const metadata = queryResults.metadatas;
    console.log(metadata);

    // executeAgentFunction
  });
});
