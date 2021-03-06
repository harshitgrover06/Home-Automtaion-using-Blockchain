import Web3 from "web3";
import ControlDevices from "./contracts/ControlDevices.json";

let selectedAccount;
let contract;
let isReady = false;

export const init = async () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Connected Account address: ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Current Account address: ${selectedAccount}`);
    });
  }

  const web3 = new Web3(provider);

  const networkId = await web3.eth.net.getId();

  try {
    contract = new web3.eth.Contract(
      ControlDevices.abi,
      ControlDevices.networks[networkId].address
    );
  } catch (err) {
    console.log(err);
  }

  isReady = true;
};

export const addDevice = async (pin) => {
  if (!isReady) {
    await init();
  }
  return contract.methods.add_device(pin).send({ from: selectedAccount });
};

export const removeDevice = async (pin) => {
  if (!isReady) {
    await init();
  }
  return contract.methods.remove_device(pin).send({ from: selectedAccount });
};

export const getDeviceStatus = async (pin) => {
  if (!isReady) {
    await init();
  }
  return contract.methods.device_status(pin).call({ from: selectedAccount });
};

export const changeDeviceStatus = async (pin) => {
  if (!isReady) {
    await init();
  }
  return contract.methods
    .change_device_status(pin)
    .send({ from: selectedAccount });
};

export const getRoomStatus = async (pin) => {
  if (!isReady) {
    await init();
  }
  return contract.methods.room_status(pin).call({ from: selectedAccount });
};

export const changeRoomStatus = async (pin) => {
  if (!isReady) {
    await init();
  }
  return contract.methods
    .change_room_status(pin)
    .send({ from: selectedAccount });
};

// getting total time of the device
export const getTotalTime = async (pin) => {
  if (!isReady) {
    await init();
  }
  return contract.methods.getTotalTime(pin).call({
    from: selectedAccount,
  });
};

export const addRoomAndDevices = async () => {
  if(!isReady) {
    await init();
  }
    return contract.methods.addRoomAndDevices().send({ from: selectedAccount });
}

export const deleteRoomAndDevices = async (n) => {
  if(!isReady) {
    await init();
  }
  return contract.methods.deleteRoomAndDevices(n).send({ from: selectedAccount });
}

export const getNRooms = async () => {
  if(!isReady) {
    await init();
  }
  return contract.methods.getNRooms().call({ from: selectedAccount })
}

export const getRoomThres = async (n) => {
  if(!isReady) {
    await init();
  }
  return contract.methods.room_thres(n).call({ from: selectedAccount });
}

export const getCurrentActiveTime = async (pin) => {
  if(!isReady) {
    await init();
  }
  return contract.methods.getCurrentActiveTime(pin).call({ from: selectedAccount });
}