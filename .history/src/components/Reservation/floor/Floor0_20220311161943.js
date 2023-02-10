import React,{useEffect, useState} from 'react';

export default function Floor0(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("00"))
  })
  {
    exist ?
    :  <path d="M1834.94 1415.09C1844.02 1420.33 1844.02 1428.84 1834.94 1434.09L1275.4 1757.11C1267.85 1761.47 1256.13 1762.3 1246.97 1759.13L945.44 1654.64C943.81 1654.08 942.306 1653.4 940.961 1652.62L516.071 1407.33C514.679 1406.53 513.469 1405.63 512.471 1404.65L340.462 1235.91C335.084 1230.63 336.565 1223.92 344.063 1219.59L903.727 896.499C912.815 891.253 927.549 891.253 936.637 896.499L1834.94 1415.09Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
  }
  {
    exist ? 
      :<line x1="0.0147055" y1="1248" x2="268.015" y2="1249.97" stroke="#CFCFCF" strokeWidth="4"/>
  }
  return (


);
}
