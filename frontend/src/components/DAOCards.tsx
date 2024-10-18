import React, { useState, useEffect } from "react";
import { StacksTestnet } from "@stacks/network";
import { callReadOnlyFunction, uintCV } from "@stacks/transactions";

const daoList = [
  {
    name: "Polygon Community Treasury",
    description:
      "The Polygon Community Treasury is a protocol-funded support DAO aimed at incentivizing and funding ecosystem growth.",
    tags: ["Grant", "PKT"],
  },
  {
    name: "AA Multisig",
    description:
      "This is an Aragon Association budget wallet on the new AragonOSx chain.",
    tags: ["protocol", "AAM"],
  },
  {
    name: "Eagle Ops",
    description:
      "Eagle Ops is responsible for maximizing effective coordination and collaboration between different Aragon teams.",
    tags: ["Social", "EGO"],
  },
  {
    name: "Libra Governance DAO",
    description:
      "Libra Governance DAO manages governance proposals and voting for the decentralized Libra protocol.",
    tags: ["Protocol", "LBR"],
  },
  // Más DAOs...
];

function DAOCards() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const network = new StacksTestnet();

    const fetchContractData = async () => {
      let fetchedResults: any[] = [];

      for (let i = 0; i < 4; i++) {
        try {
          const options = {
            contractAddress: "STNMSHXM8WZT2DN4SDC1EHTYJY97012YF7CXRZF3",
            contractName: "TestFactoryDAO",
            functionName: "get-listing",
            functionArgs: [uintCV(i)],
            senderAddress: "STNMSHXM8WZT2DN4SDC1EHTYJY97012YF7CXRZF3",
            network,
          };

          const result = await callReadOnlyFunction(options);
          fetchedResults.push(result);
        } catch (error) {
          console.error(`Error fetching data for DAO index ${i}:`, error);
        }
      }

      setResults(fetchedResults);
      console.log("Resultados obtenidos:", fetchedResults);
    };

    fetchContractData();
  }, []);

  return (
    <section className="w-full py-16 bg-white">
      <h3 className="text-3xl text-center text-red-600 font-bold">
        Explore DAOs
      </h3>

      {/* Mostrar resultados simulados */}
      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {results.map((result, index) => {
            const name = result.value?.data["name-dao"]?.data || "N/A";
            const tokenSymbol =
              result.value?.data["token-symbol"]?.data || "N/A";

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-semibold text-gray-800">{name}</h4>

                <p className="text-gray-600 mt-2">{`Name: ${name}`}</p>
                <p className="text-gray-600 mt-2">{`Token Symbol: ${tokenSymbol}`}</p>
                <div className="mt-4 flex space-x-2">
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                  >
                    tag
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">Fetching DAO data...</p>
      )}

      {/* Mostrar tarjetas DAO */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {daoList.slice(0, 4).map((dao, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <h4 className="text-xl font-semibold text-gray-800">{dao.name}</h4>
            <p className="text-gray-600 mt-2">{dao.description}</p>

            <div className="mt-4 flex space-x-2">
              {dao.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
          Show more
        </button>
      </div>
    </section>
  );
}

export default DAOCards;
