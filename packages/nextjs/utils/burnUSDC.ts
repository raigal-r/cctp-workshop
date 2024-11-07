// utils/burnUSDC.ts
import { ethers } from "ethers";

// This function will initiate the burn of USDC on the Ethereum Sepolia chain
export const burnUSDC = async (
  provider: ethers.providers.Web3Provider,
  usdcAddress: string,
  cctpAddress: string,
  amount: string,
  destinationDomain: number,
  destinationAddress: string,
  signer: ethers.Signer,
) => {
  const cctpContractABI = [
    "function depositForBurn(uint256 amount, uint32 destinationDomain, bytes32 mintRecipient, address burnToken) public",
  ];

  const cctpContract = new ethers.Contract(cctpAddress, cctpContractABI, signer);

  const amountInWei = ethers.utils.parseUnits(amount, 6); // 6 decimals for USDC

  // Encode the destination address
  const encodedDestinationAddress = ethers.utils.defaultAbiCoder.encode(["address"], [destinationAddress]);

  try {
    const tx = await cctpContract.depositForBurn(
      amountInWei,
      destinationDomain,
      encodedDestinationAddress,
      usdcAddress,
    );
    console.log("Burn transaction sent:", tx.hash);
    await tx.wait(); // Wait for transaction confirmation
    console.log("Burn transaction confirmed");
  } catch (error) {
    console.error("Error burning USDC:", error);
  }
};
