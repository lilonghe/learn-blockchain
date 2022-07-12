// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lucky {
    mapping(address => uint) public Users;
    // event CollectMoney(address user, uint money);

    function saveMoney() public payable {
        Users[msg.sender] = Users[msg.sender] + msg.value;
        // emit CollectMoney(msg.sender, money);
        
    }

    function withdrawMoney() public {
        uint money = Users[msg.sender];
        payable(msg.sender).transfer(money);
        Users[msg.sender] = 0;
    }

    function getMoney() public view returns (uint) {
        return Users[msg.sender];
    }
}