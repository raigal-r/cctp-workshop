// utils/checkTransactionStatus.ts

export const checkTransactionStatus = async (apiKey: string, transactionId: string) => {
  try {
    const response = await fetch(`https://api.circle.com/v1/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking transaction status:", error);
    throw new Error("Failed to check transaction status");
  }
};
