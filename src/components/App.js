import React, {useEffect, useState, memo} from 'react'
import Web3 from 'web3';
import TODO_LIST_ABI from '../../build/contracts/TodoList';

const App = memo(() => {
  const [currentAccount, setCurrentAccount] = useState();
  const [currentContract, setCurrentContract] = useState();
  const [currentTodoList, setCurrentTodoList] = useState(null);

  const connectToCurrentAccount = async () => {
    const web3 = new Web3(Web3.givenProvider || process.env.BASE_LOCALHOST);
    const accounts = await web3.eth.requestAccounts();
    const todoList = await new web3.eth.Contract(TODO_LIST_ABI.abi, process.env.CONTRACT_ADDRESS);

    setCurrentAccount(accounts[0]);
    setCurrentContract(todoList);
  }

  const getTodoList = async () => {
    const taskCount = await currentContract.methods.taskCount().call();
    const contractTasks = [];

    for(let i = 1; i <= taskCount; i++) {
      const task = await currentContract.methods.tasks(i).call();
      contractTasks.push(task.content);
    }

    setCurrentTodoList(contractTasks);
  }

  useEffect(() => {
    connectToCurrentAccount();
  }, [])

  useEffect(() => {
    if (currentContract && !currentTodoList) {
      getTodoList();
    }
  }, [currentContract])

  return (
    <div>
      Account address {currentAccount}

      {currentTodoList && (
        currentTodoList.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))
      )}
    </div>
  )
})

export default App;
