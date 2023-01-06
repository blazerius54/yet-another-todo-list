import React, {useEffect, useState} from 'react'
import Web3 from 'web3';
import TODO_LIST_ABI from '../../build/contracts/TodoList';


const App = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [currentTodoList, setCurrentTodoList] = useState();

  const connectToCurrentAccount = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const accounts = await web3.eth.requestAccounts();
    const todoList = await new web3.eth.Contract(TODO_LIST_ABI.abi, process.env.CONTRACT_ADDRESS);

    setCurrentAccount(accounts[0]);
    setCurrentTodoList(todoList);
  }

  const getTodoList = async () => {
    const taskCount = await currentTodoList.methods.taskCount().call();
    console.log(taskCount)
  }

  useEffect(() => {
    connectToCurrentAccount();
  }, [])

  useEffect(() => {
    if (currentAccount && currentTodoList) {
      getTodoList();
    }
  }, [currentAccount, currentTodoList])

  return (
    <div>
      Account address {currentAccount}
    </div>
  )
}

export default App;
