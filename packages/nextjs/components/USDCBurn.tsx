// components/USDCBurn.tsx
import React, { useState } from "react";
import { burnUSDC } from "../utils/burnUSDC";
import { ethers } from "ethers";

const USDCBurn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Define contract addresses (make sure to replace with correct ones for the network you're using)
  const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // USDC contract address on Ethereum Sepolia
  const cctpAddress = "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5"; // TokenMessenger contract address
  const amount = "5"; // Amount of USDC to burn (5 USDC)
  // Domains list: https://developers.circle.com/stablecoins/supported-domains
  const destinationDomain = 6; // Circle identifier for Base (destination chain)

  const handleBurn = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      // Get the provider and signer from the window (MetaMask, etc.)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const destinationAddress = await signer.getAddress(); // Use the signer's address as the destination address

      // Call burnUSDC function to burn 5 USDC for CCTP
      await burnUSDC(provider, usdcAddress, cctpAddress, amount, destinationDomain, destinationAddress, signer);

      setResponse(`Successfully burned ${amount} USDC for transfer to Base.`);
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Burn USDC for Cross-Chain Transfer</h1>
      <button onClick={handleBurn} disabled={loading}>
        {loading ? "Processing..." : `Burn 5 USDC`}
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

export default USDCBurn;
