pragma solidity ^0.5.0;

contract TodoList {
    address public owner;
    uint public taskCount = 0;
    bool public testB;

    constructor() public {
        owner = msg.sender;
        createTask('TodoList has been initialised and created first task');
        createTask('Created second task');
    }


    struct Task {
        uint id;
        string content;
        bool isCompleted;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);

        emit TaskCreated(taskCount, _content, false);
    }
}