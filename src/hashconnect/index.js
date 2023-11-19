import { HashConnect } from "hashconnect";
import { ContractId, ContractExecuteTransaction } from "@hashgraph/sdk";

let hashconnect = new HashConnect(true);
const contractId = ContractId.fromString("0.0.5906887");

let appMetadata = {
  name: "OnceUponADream",
  description: "hedera dApp",
  icon: "https://absolute.url/to/icon.png",
};

let saveData = {};

export const pairHashpack = async () => {
  //register events
  // setUpHashConnectEvents();

  let initData = await hashconnect.init(appMetadata, "testnet", false);
  hashconnect.connectToLocalWallet();

  for (const [key, value] of Object.entries(initData)) {
    saveData[key] = value;
  }
  console.log(saveData);

  return initData;
};
export const contractSigningFunc = async () => {
  const provider = hashconnect.getProvider(
    "testnet",
    saveData.topic,
    saveData.savedPairings[0].accountIds[0]
  );
  const signer = hashconnect.getSigner(provider);
  const sendHbarTx = new ContractExecuteTransaction(contractId)
    .setGas(100000)
    .setFunction("getAllCompletedStories")
    .freezeWithSigner(signer);
  const response = await (await sendHbarTx).executeWithSigner(signer);
  console.log(response);
  return response.getString(0);
};
