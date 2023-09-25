import { Chroma, ChromaAdd } from "../agent/memory";

export const SOFTWARE_DEVELOPER_DOCUMENTS: ChromaAdd = {
  ids: ["1", "2", "3", "4", "5"],
  metadatas: [
    { action: "setup", type: "webserver", tech: "nginx" },
    { action: "setup", type: "webserver", tech: "apache" },
    { action: "monitor", type: "webserver", tech: "any" },
    { action: "setup", type: "database", tech: "mongodb" },
    { action: "setup", type: "frontend", tech: "react" },
  ],
  documents: [
    "Set up an nginx web server.",
    "Configure an apache web server.",
    "Monitor health of the web server.",
    "Initialize a MongoDB database.",
    "Create a React frontend.",
  ],
};

export const RESEARCHER_DOCUMENTS: ChromaAdd = {
  ids: ["1", "2", "3", "4", "5"],
  metadatas: [
    { action: "study", topic: "quantum_mechanics", resource: "book" },
    { action: "experiment", topic: "cell_biology", equipment: "microscope" },
    { action: "write", type: "research_paper", subject: "neural_networks" },
    {
      action: "present",
      event: "international_conference",
      topic: "astrophysics",
    },
    { action: "collaborate", field: "genetics", method: "lab_work" },
  ],
  documents: [
    "Read a comprehensive book on quantum mechanics.",
    "Conduct an experiment on cell biology using a microscope.",
    "Write a research paper on advancements in neural networks.",
    "Present a paper on astrophysics at an international conference.",
    "Collaborate with a team on genetics research in a laboratory setting.",
  ],
};

export const SCRIPT_WRITER: ChromaAdd = {
  ids: ["1", "2"],
  metadatas: [
    {
      name: "fs.writeFile",
      arguments: "{ path: string, data: string, encoding: string }",
    },
    {
      namespace: "math.sin",
      arguments: "{ angle: number }",
    },
  ],
  documents: [
    "Writes data to a file, replacing the file if it already exists",
    "Calculate the sine of a given angle in degrees",
  ],
};

export async function seedChromaDB(instance: Chroma, data: ChromaAdd) {
  await instance.add(data as any);
}
