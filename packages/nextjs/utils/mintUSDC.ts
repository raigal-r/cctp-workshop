// utils/mintUSDC.ts
import { ethers } from "ethers";

export const mintUSDC = async (messageBytes: string, attestation: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD",
      ["function receiveMessage(bytes message, bytes attestation)"],
      signer,
    );

    const tx = await contract.receiveMessage(messageBytes, attestation, {
      gasLimit: 300000,
    });
    const receipt = await tx.wait();
    console.log("Transaction ID:", receipt.transactionHash);
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error minting USDC:", error);
    throw new Error("Failed to mint USDC");
  }
};
