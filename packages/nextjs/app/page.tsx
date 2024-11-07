// ~~/app/page.tsx
"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import USDCApproval from "~~//components/USDCApproval";
import FetchAttestation from "~~/components/FetchAttestation";
import MintUSDCButton from "~~/components/MintUSDCButton";
import USDCBurn from "~~/components/USDCBurn";
import { Address } from "~~/components/scaffold-eth";

// ~~/app/page.tsx

// ~~/app/page.tsx

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <USDCApproval />
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <USDCBurn />
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <FetchAttestation />
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MintUSDCButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
