import React, { useState } from "react";

const SolveArr = () => {
  // let array = [
  //   {
  //     id: 1,
  //     name: "Vishal",
  //   },
  //   {
  //     id: 1,
  //     name: "Rinku",
  //   },
  //   {
  //     id: 2,
  //     name: "Mayank",
  //   },
  //   {
  //     id: 2,
  //     name: "Piyush",
  //   },
  // ];

  let array = [1, 1, 1];

  const solveQue = (nums) => {
    if(nums.length<2){
      return 0;
    }

    let count=0;

    for(let i=1;i<nums.length;i++){
      if(nums[i]<=nums[i-1]){
        let change=nums[i-1]-nums[i]+1;
        nums[i]+=change;
        count+=change;
      }
    }
    return count;
  };

  console.log("solveQue", solveQue(array));

  return (
    <div>
      <h1>SolveArr</h1>
    </div>
  );
};

export default SolveArr;
