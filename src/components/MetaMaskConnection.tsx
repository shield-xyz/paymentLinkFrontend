// components/MetaMaskConnection.js
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react';
import { Web3 } from 'web3';

const MetaMaskConnection = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [web3, setWeb3] = useState(null);

  //TODO tener en cuenta que desde metamask seguramente podramos conectarnos a mas de una sola red, programar de forma generica y escalable
  //TODO keep in mind that from MetaMask we can probably connect to more than one network, program in a generic and scalable way
  useEffect(() => {
    const connectMetaMask = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        try {
          // Request account access if needed
          await provider.request({ method: 'eth_requestAccounts' });
          // Get the connected accounts
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Get the network ID
          const networkId = await web3Instance.eth.net.getId();
          handleNetworkChange(networkId);

          // Listen for network and account changes
          provider.on('chainChanged', handleChainChanged);
          provider.on('accountsChanged', handleAccountsChanged);
        } catch (error) {
          console.error('Error connecting to MetaMask', error);
        }
      } else {
        console.error('MetaMask not detected');
      }
    };

    connectMetaMask();

    // Cleanup event listeners on component unmount
    return () => {
      if (web3 && web3.currentProvider && web3.currentProvider.off) {
        web3.currentProvider.off('chainChanged', handleChainChanged);
        web3.currentProvider.off('accountsChanged', handleAccountsChanged);
      }
    };
  }, [web3]);

  // Handle network change
  const handleNetworkChange = (networkId) => {
    if (networkId === 1) {
      setNetwork('Ethereum Mainnet');
    } else if (networkId === 11155111) {
      setNetwork('Sepolia Testnet');
    } else {
      setNetwork('Other network');
    }
  };

  // Reload the page when the chain is changed

  const handleChainChanged = () => {
    window.location.reload();
  };

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.error('Please connect to MetaMask.');
    } else {
      setAccount(accounts[0]);
    }
  };

  // Function to switch to Sepolia Testnet
  const switchToSepolia = async () => {
    if (web3 && web3.currentProvider) {
      try {
        await web3.currentProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(11155111) }],
        });
      } catch (error) {
        if (error.code === 4902) {
          console.error(
            'This network is not available in your MetaMask, please add it manually',
          );
        } else {
          console.error('Failed to switch network', error);
        }
      }
    }
  };

  // Function to transfer tokens
  //TODO el amount deberia ser la cantidad total de el linkpayment, pero tambien multiplicarlo por la cantidad de decimales de dicho token
  //TODO the amount should be the total quantity of the linkpayment, but also multiply it by the number of decimals of said token
  const transferTokens = async (tokenAddress, amount, to) => {
    if (web3 && account) {
      const tokenContract = new web3.eth.Contract(
        [
          {
            constant: false,
            inputs: [
              {
                name: '_to',
                type: 'address',
              },
              {
                name: '_value',
                type: 'uint256',
              },
            ],
            name: 'transfer',
            outputs: [
              {
                name: '',
                type: 'bool',
              },
            ],
            type: 'function',
          },
        ],
        tokenAddress,
      );

      try {
        const result = await tokenContract.methods
          .transfer(to, amount)
          .send({ from: account });
        console.log('Transfer successful:', result);
        //TODO aca deberia hacer el POST para enviar el hash, name, email (si hay) y paymentLinkId al backend para validar tx.
        //TODO here should be the POST to send the hash, name, email (if any) and paymentLinkId to the backend to validate tx.
      } catch (error) {
        console.error('Transfer failed:', error);
      }
    }
  };

  //TODO ejemplo de envio de tx, deberia tomarse la informacion de linkpayment.
  //TODO example of tx sending, the linkpayment information should be taken.
  const handleTransferClick = async () => {
    const tokenAddress = '0x6ecB87087788c2FDB0e20D177E9974f1485263D8'; // Replace with the token address
    const amount = '1'; // Replace with the amount to transfer
    const to = '0xAb816fD46dEf5518dd615d863463A2226ef1745A'; // Replace with the recipient address
    await transferTokens(tokenAddress, amount, to);
  };

  return (
    <div>
      <h1>MetaMask Connection</h1>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
          <p>Network: {network}</p>
          {network !== 'Sepolia Testnet' && (
            <button onClick={switchToSepolia}>Switch to Sepolia Testnet</button>
          )}
          <button onClick={handleTransferClick}>Transfer Tokens</button>
        </div>
      ) : (
        <p>Not connected to MetaMask</p>
      )}
    </div>
  );
};

export default MetaMaskConnection;
