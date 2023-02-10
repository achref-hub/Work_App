import React,{useEffect,useState} from 'react';

export default function Floor10(props) {
  var [exist,setExist]=useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("10"))
  })
  return (
      <svg>
        {
          exist ? 
          : <path d="M1836.94 530.088C1846.02 535.334 1846.02 543.84 1836.94 549.087L1277.4 872.108C1269.85 876.467 1258.13 877.3 1248.97 874.127L947.44 769.643C945.81 769.078 944.306 768.4 942.961 767.624L518.071 522.335C516.679 521.531 515.469 520.628 514.471 519.649L342.462 350.906C337.084 345.63 338.565 338.922 346.063 334.593L905.727 11.4994C914.815 6.25302 929.549 6.25301 938.637 11.4994L1836.94 530.088Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>

        }
        {
          exist ? 
          :<line x1="0.0147055" y1="360" x2="268.015" y2="361.971" stroke="#CFCFCF" strokeWidth="4"/>
        }

      </svg>
  );
}
