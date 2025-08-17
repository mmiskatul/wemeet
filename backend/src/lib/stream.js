import { StreamChat } from "stream-chat";

// Initialize mock client for development
const mockClient = {
  upsertUser: async () => {
    console.log("Mock Stream upsertUser called");
    return true;
  },
  createToken: async () => {
    console.log("Mock Stream token generated");
    return "mock-stream-token";
  }
};

// Try to initialize real Stream client
let streamClient;
try {
  console.log("Loading Stream Chat with API Key:", process.env.STREAM_API_KEY ? "exists" : "MISSING");
  
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.warn("⚠️ Stream Chat credentials missing - using mock client");
    if (process.env.NODE_ENV === 'production') {
      throw new Error("Stream API credentials required in production");
    }
    streamClient = mockClient;
  } else {
    console.log("✅ Stream Chat credentials found, initializing...");
    streamClient = StreamChat.getInstance(apiKey, apiSecret);
  }
} catch (err) {
  console.error("Stream initialization error:", err);
  streamClient = mockClient;
}

// Unified functions that work in both modes
export const upsertStreamUser = async (userData) => {
  try {
    console.log("Upserting user:", userData.id);
    return await streamClient.upsertUser(userData);
  } catch (error) {
    console.error("Stream upsertUser error:", error);
    throw error;
  }
};

export const generateStreamToken = async (userId) => {
  try {
    // ensure userid i string 
    const userIdStr= userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error in the genrateStreamToken : ",error.message);
    res.status(500).json({
      message:"Server Error"
    })
  }
};

// Log initialization status
console.log("Stream client initialized in", 
  streamClient === mockClient ? "MOCK mode" : "REAL mode");