import React,{useState,useEffect} from 'react';

export default function Floor5(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("05"))
  })
  {
    exist ? 
    : <path d="M1834.94 1001.09C1844.02 1006.33 1844.02 1014.84 1834.94 1020.09L1275.4 1343.11C1267.85 1347.47 1256.13 1348.3 1246.97 1345.13L945.44 1240.64C943.81 1240.08 942.306 1239.4 940.961 1238.62L516.071 993.335C514.679 992.531 513.469 991.628 512.471 990.649L340.462 821.906C335.084 816.63 336.565 809.922 344.063 805.593L903.727 482.499C912.815 477.253 927.549 477.253 936.637 482.499L1834.94 1001.09Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
  }
  {
    exist ?
    :<line x1="0.0147055" y1="812" x2="268.015" y2="813.971" stroke="#CFCFCF" strokeWidth="4"/>
  }
  return (

 );
}
