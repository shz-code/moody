import { Pinecone } from "@pinecone-database/pinecone";

// Initialize a client
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export const index = pinecone.Index("moodydb");
