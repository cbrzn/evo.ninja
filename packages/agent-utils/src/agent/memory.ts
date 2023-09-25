import { ChromaClient, OpenAIEmbeddingFunction, Collection } from "chromadb";
import {
  ID,
  IDs,
  Embedding,
  Embeddings,
  Metadata,
  Metadatas,
  Documents,
} from "chromadb/dist/main/types";

export abstract class Memory {
  public abstract get(query: string): Promise<any>;
  public abstract add(data: any): Promise<any>;
}

export interface ChromaAdd {
  ids: ID | IDs;
  embeddings?: Embedding | Embeddings;
  metadatas?: Metadata | Metadatas;
  documents?: Document | Documents;
}

export class Chroma extends Memory {
  private _client: ChromaClient;
  private _collection: Promise<Collection>;
  private _embedder: OpenAIEmbeddingFunction;

  constructor(collectionName: string, openAiKei: string) {
    super();
    this._client = new ChromaClient();
    this._embedder = new OpenAIEmbeddingFunction({
      openai_api_key: openAiKei,
    });

    this._collection = this._client.getOrCreateCollection({
      name: collectionName,
      embeddingFunction: this._embedder,
    });
  }

  public async get(query: string): Promise<any> {
    const collection = await this._collection;
    return collection.query({
      nResults: 1,
      queryTexts: [query],
    });
  }

  public async add(data: Record<string, unknown>): Promise<any> {
    const collection = await this._collection;
    return collection.add(data as any);
  }
}
