// utils/approveUSDC.ts
import { ethers } from "ethers";

// This function will approve USDC to be spent by the CCTP contract
export const approveUSDC = async (
  provider: ethers.providers.Web3Provider,
  usdcAddress: string,
  cctpAddress: string,
  amount: string,
  signer: ethers.Signer,
) => {
  const usdcContractABI = ["function approve(address spender, uint256 amount) public returns (bool)"];

  const usdcContract = new ethers.Contract(usdcAddress, usdcContractABI, signer);

  const amountInWei = ethers.utils.parseUnits(amount, 6); // 6 decimals for USDC

  try {
    const tx = await usdcContract.approve(cctpAddress, amountInWei);
    console.log("Approval transaction sent:", tx.hash);
    await tx.wait(); // Wait for transaction confirmation
    console.log("Approval transaction confirmed");
  } catch (error) {
    console.error("Error approving USDC:", error);
  }
};
