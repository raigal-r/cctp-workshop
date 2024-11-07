import React, { useEffect, useState } from "react";
import { checkTransactionStatus } from "../utils/checkTransactionStatus";
import { fetchAttestation } from "../utils/fetchAttestation";
import { mintUSDC } from "../utils/mintUSDC";
import { ethers } from "ethers";

const MintUSDCButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(
    "0x5d3e12d568046d801125e9e964366a0c69a3accba5bbfbaf282a87958bcbc1a4",
  );
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

  const fetchTransactionData = async (txId: string) => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    );
    const receipt = await provider.getTransactionReceipt(txId);
    const log = receipt.logs.find(log => log.topics[0] === ethers.utils.id("MessageSent(bytes)"));
    if (!log) throw new Error("MessageSent event not found");
    return ethers.utils.defaultAbiCoder.decode(["bytes"], log.data)[0];
  };

  const handleMintUSDC = async () => {
    setLoading(true);
    try {
      const messageBytes = await fetchTransactionData(transactionId!);
      const attestationResponse = await fetchAttestation(transactionId!);
      const attestation = attestationResponse.attestation;
      if (messageBytes && attestation) {
        const txId = await mintUSDC(messageBytes, attestation);
        setTransactionId(txId);
        console.log("USDC Minted Successfully:", txId);
      }
    } catch (error) {
      console.error("Error minting USDC:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckTransactionStatus = async () => {
    if (!transactionId) return;
    try {
      const status = await checkTransactionStatus(process.env.NEXT_PUBLIC_TEST_API_KEY!, transactionId);
      setTransactionStatus(JSON.stringify(status, null, 2));
    } catch (error) {
      console.error("Error fetching transaction status:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={transactionId || ""}
        onChange={e => setTransactionId(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleMintUSDC} disabled={loading}>
        {loading ? "Minting..." : "Mint USDC"}
      </button>
      {transactionId && (
        <>
          <button onClick={handleCheckTransactionStatus}>Check Transaction Status</button>
          {transactionStatus && <pre>{transactionStatus}</pre>}
        </>
      )}
    </div>
  );
};

export default MintUSDCButton;
