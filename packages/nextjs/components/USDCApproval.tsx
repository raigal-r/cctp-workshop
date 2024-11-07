// components/USDCApproval.tsx
import React, { useState } from "react";
import { approveUSDC } from "../utils/approveUSDC";
import { ethers } from "ethers";

const USDCApproval: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Define contract addresses (make sure to replace with correct ones for the network you're using)
  const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // USDC contract address
  const cctpAddress = "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5"; // CCTP contract address
  const amount = "5"; // Amount of USDC to approve (5 USDC)

  const handleApproval = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      // Get the provider and signer from the window (MetaMask, etc.)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Call approveUSDC function to approve 5 USDC for CCTP
      await approveUSDC(provider, usdcAddress, cctpAddress, amount, signer);

      setResponse(`Successfully approved ${amount} USDC for CCTP.`);
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Approve USDC for CCTP</h1>
      <button onClick={handleApproval} disabled={loading}>
        {loading ? "Processing..." : `Approve 5 USDC`}
      </button>
      {response && (
        <div>
          <h2>Success</h2>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default USDCApproval;
