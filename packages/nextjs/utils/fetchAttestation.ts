// utils/fetchAttestation.ts

import { ethers } from "ethers";

interface AttestationResponse {
    status: string;
    attestation?: string; // Optional property
  }

export const fetchAttestation = async (transactionId: string) => {
  const apiKey = process.env.TEST_API_KEY;
  if (!transactionId) {
    transactionId = "0x5d3e12d568046d801125e9e964366a0c69a3accba5bbfbaf282a87958bcbc1a4";
  }

  try {
    // Step 1: Fetch the transaction object
    const provider = new ethers.providers.JsonRpcProvider(
        `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      );
    const transaction = await provider.getTransaction(transactionId);
    console.log("Transaction response:", transaction);

    if (!transaction.hash) {
      throw new Error("Transaction hash is undefined");
    }

    // Step 2: Decode messageBytes and messageHash from the transaction hash using ethers
    const txReceipt = await provider.getTransactionReceipt(transaction.hash);

    const eventTopic = ethers.utils.id("MessageSent(bytes)");
    const log = txReceipt.logs.find(l => l.topics[0] === eventTopic);
    if (!log) throw new Error("MessageSent event not found");

    const messageBytes = ethers.utils.defaultAbiCoder.decode(["bytes"], log.data)[0];
    console.log(messageBytes);
    const messageHash = ethers.utils.keccak256(messageBytes);
    console.log(messageHash);

    // Step 3: Fetch the attestation signature from Circle's Iris API using fetch
    let attestationResponse: AttestationResponse = { status: "pending" };
    while (attestationResponse.status !== "complete") {
      const attestationResponseRaw = await fetch(`https://iris-api-sandbox.circle.com/attestations/${messageHash}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      attestationResponse = await attestationResponseRaw.json();
      if (attestationResponse.status !== "complete") {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
      }
    }

    return {
        ...attestationResponse,
        attestation: attestationResponse.attestation || "default_attestation_value" // Replace with actual attestation if available
      };
    } catch (error) {
    console.error("Error fetching attestation:", error);
    throw new Error("Failed to fetch attestation");
  }
};
