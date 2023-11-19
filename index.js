console.clear();
require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,
	FileCreateTransaction,
	ContractCreateTransaction,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	ContractCallQuery,
	Hbar,
	ContractCreateFlow,
} = require("@hashgraph/sdk");
const fs = require("fs");
const { emit } = require("process");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
	// Import the compiled contract bytecode
	const contractBytecode = fs.readFileSync("contract_sol_StoryPromptContract.bin");

	// Instantiate the smart contract and Create the transaction
  const contractCreate = new ContractCreateFlow()
    .setGas(200000)
    .setBytecode(contractBytecode);

  //Sign the transaction with the client operator key and submit to a Hedera network
  const txResponse = contractCreate.execute(client);

  //Get the receipt of the transaction
  const receipt = (await txResponse).getReceipt(client);

  //Get the new contract ID
  const newContractId = (await receipt).contractId;
      
  console.log("The new contract ID is " +newContractId);

  //Create story prompt
  const transaction = new ContractExecuteTransaction()
  .setContractId(newContractId)
  .setGas(100000)
  .setFunction("createStoryPrompt", new ContractFunctionParameters());

  //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
  const ctxResponse = await transaction.execute(client);
  //Request the receipt of the transaction
  const receiptTx = await ctxResponse.getReceipt(client);
  //Show consensus status 
  const transactionStatus = receiptTx.status;
  console.log("The transaction consensus status is " +transactionStatus);

  //get num story prompts
  const transactionQ2 = new ContractCallQuery()
  .setContractId(newContractId)
  .setGas(100000)
  .setFunction("getStoryPromptCount", new ContractFunctionParameters());

  //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
  const ctxResponseQ2 = await transactionQ2.execute(client);
  //Request the receipt of the transaction
  const receiptTxQ2 = ctxResponseQ2.getUint256(0);
  console.log(`- Here's the story prompt number that you asked for: ${receiptTxQ2} \n`);

  //Submit a word
  const transaction3 = new ContractExecuteTransaction()
  .setContractId(newContractId)
  .setGas(10000000)
  .setFunction("submitWord", new ContractFunctionParameters()
        .addUint256(0)
        .addString("Heelo!"))

  //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
  const txResponse3 = await transaction3.execute(client);
  //Request the receipt of the transaction
  const receipt3 = await txResponse3.getReceipt(client);
  //Get the transaction consensus status
  const transactionStatus3 = receipt3.status;
  console.log("The transaction consensus status is " +transactionStatus3);
  
  //get prompt by index
  const transactionQ4 = new ContractCallQuery()
  .setContractId(newContractId)
  .setGas(100000)
  .setFunction("getStoryPrompt", new ContractFunctionParameters()
        .addUint256(0));

  //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
  const ctxResponseQ4 = await transactionQ4.execute(client);
  //Request the receipt of the transaction
  const receiptTxQ4 = ctxResponseQ4.getString(0);
  console.log(`- Here's the story prompt that you asked for: ${receiptTxQ4} \n`);

  //Submit a word
  const transaction5 = new ContractExecuteTransaction()
  .setContractId(newContractId)
  .setGas(10000000)
  .setFunction("submitWord", new ContractFunctionParameters()
        .addUint256(0)
        .addString("There "))

  //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
  const txResponse5 = await transaction5.execute(client);
  //Request the receipt of the transaction
  const receipt5 = await txResponse5.getReceipt(client);
  //Get the transaction consensus status
  const transactionStatus5 = receipt5.status;
  console.log("The transaction consensus status is " +transactionStatus5);

	// Query the contract to check changes in state variable
	/*const contractQueryTx = new ContractCallQuery()
		.setContractId(contractId)
		.setGas(100000)
		.setFunction("getMobileNumber", new ContractFunctionParameters().addString("Alice"));
	const contractQuerySubmit = await contractQueryTx.execute(client);
	const contractQueryResult = contractQuerySubmit.getUint256(0);
	console.log(`- Here's the phone number that you asked for: ${contractQueryResult} \n`);

	// Call contract function to update the state variable
	const contractExecuteTx = new ContractExecuteTransaction()
		.setContractId(contractId)
		.setGas(100000)
		.setFunction(
			"setMobileNumber",
			new ContractFunctionParameters().addString("Bob").addUint256(222222)
		);
	const contractExecuteSubmit = await contractExecuteTx.execute(client);
	const contractExecuteRx = await contractExecuteSubmit.getReceipt(client);
	console.log(`- Contract function call status: ${contractExecuteRx.status} \n`);

	// Query the contract to check changes in state variable
	const contractQueryTx1 = new ContractCallQuery()
		.setContractId(contractId)
		.setGas(100000)
		.setFunction("getMobileNumber", new ContractFunctionParameters().addString("Bob"));
	const contractQuerySubmit1 = await contractQueryTx1.execute(client);
	const contractQueryResult1 = contractQuerySubmit1.getUint256(0);
	console.log(`- Here's the phone number that you asked for: ${contractQueryResult1} \n`);*/
    }
main();