// components/FetchAttestation.tsx
import React, { useState } from "react";
import { fetchAttestation } from "../utils/fetchAttestation";

const FetchAttestation = () => {
  const [transactionId, setTransactionId] = useState("");
  const [attestation, setAttestation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchAttestation = async () => {
    setLoading(true);
    setError(null);
    try {
      const attestationResponse = await fetchAttestation(transactionId);
      setAttestation(attestationResponse);
    } catch (err) {
      setError("Failed to fetch attestation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Fetch Circle Attestation</h2>
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={e => setTransactionId(e.target.value)}
      />
      <button onClick={handleFetchAttestation} disabled={loading}>
        {loading ? "Fetching Attestation..." : "Fetch Attestation"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {attestation && (
        <div>
          <h3>Attestation Details:</h3>
          <pre>{JSON.stringify(attestation, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FetchAttestation;
