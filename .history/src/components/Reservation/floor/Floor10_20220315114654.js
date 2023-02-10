import React,{useEffect,useState} from 'react';

export default function Floor10(props) {
  var [exist,setExist]=useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("10"))
  })
  return (
      <svg>
        {
          exist ? <path d="M1836.94 530.088C1846.02 535.334 1846.02 543.84 1836.94 549.087L1277.4 872.108C1269.85 876.467 1258.13 877.3 1248.97 874.127L947.44 769.643C945.81 769.078 944.306 768.4 942.961 767.624L518.071 522.335C516.679 521.531 515.469 520.628 514.471 519.649L342.462 350.906C337.084 345.63 338.565 338.922 346.063 334.593L905.727 11.4994C914.815 6.25302 929.549 6.25301 938.637 11.4994L1836.94 530.088Z" fill="#002171" stroke="#1DE84A" strokeWidth="4"/>
          : <path d="M1836.94 530.088C1846.02 535.334 1846.02 543.84 1836.94 549.087L1277.4 872.108C1269.85 876.467 1258.13 877.3 1248.97 874.127L947.44 769.643C945.81 769.078 944.306 768.4 942.961 767.624L518.071 522.335C516.679 521.531 515.469 520.628 514.471 519.649L342.462 350.906C337.084 345.63 338.565 338.922 346.063 334.593L905.727 11.4994C914.815 6.25302 929.549 6.25301 938.637 11.4994L1836.94 530.088Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>

        }
        {
          exist ? 
          :<line x1="0.0147055" y1="360" x2="268.015" y2="361.971" stroke="#CFCFCF" strokeWidth="4"/>
        }
        <line x1="0.0147055" y1="360" x2="268.015" y2="361.971" stroke="#1DE84A" strokeWidth="4"/>
<rect opacity="0.7" width="172.281" height="330.013" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1430.42 307.003)" fill="#5472D3" fillOpacity="0.5"/>
<path d="M842.22 310.402C844.612 311.782 844.612 314.021 842.22 315.401L554.678 481.399C551.917 482.993 547.311 482.709 545.198 480.813L382.33 334.71C380.77 333.311 381.111 331.474 383.149 330.297L625.586 190.338C627.978 188.958 631.855 188.958 634.247 190.338L842.22 310.402Z" fill="#5472D3" fillOpacity="0.5"/>
<path d="M1615.4 641.211C1617.79 642.591 1617.79 644.83 1615.4 646.21L1278.27 840.836C1276.26 841.993 1273.15 842.205 1270.73 841.348L1040.03 759.475C1036.65 758.277 1036.11 755.571 1038.92 753.958L1421.44 534.226C1423.84 532.852 1427.7 532.855 1430.09 534.233L1615.4 641.211Z" fill="#5472D3" fillOpacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1819.33 529.812)" fill="#5472D3" fillOpacity="0.5"/>
<rect width="172.28" height="143.207" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1707.34 465.191)" fill="#5472D3" fillOpacity="0.5"/>
<rect width="172.28" height="143.207" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1569.64 386.696)" fill="#5472D3" fillOpacity="0.5"/>
<rect width="140.683" height="193.335" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1090.95 113.96)" fill="#5472D3" fillOpacity="0.5"/>
<rect width="167.691" height="193.335" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 955.253 192.065)" fill="#5472D3" fillOpacity="0.5"/>
<path d="M1388.35 510.413C1390.74 511.793 1390.74 514.032 1388.35 515.412L1075.03 696.294C1072.63 697.675 1068.76 697.675 1066.37 696.294L681.825 474.299C679.433 472.918 679.433 470.68 681.825 469.299L995.148 288.417C997.539 287.037 1001.42 287.037 1003.81 288.417L1388.35 510.413Z" fill="#5472D3" fillOpacity="0.5"/>
<rect width="100" height="109" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1202.95 413.947)" fill="#4464C1" fillOpacity="0.5"/>
<rect width="122.459" height="108.318" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1060.94 377.963)" fill="#4464C1" fillOpacity="0.5"/>
<rect width="122.459" height="108.318" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 948.353 443.959)" fill="#4464C1" fillOpacity="0.5"/>
<rect width="100" height="109" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1305.55 473.179)" fill="#4464C1" fillOpacity="0.5"/>
<rect width="140" height="189" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1187.29 524.765)" fill="#4464C1" fillOpacity="0.5"/>
<path d="M43.3906 335.465H36.2305V343H33.9805V325.938H44.5508V327.789H36.2305V333.625H43.3906V335.465ZM49.2617 343H47.0938V325H49.2617V343ZM52.168 336.543C52.168 335.301 52.4102 334.184 52.8945 333.191C53.3867 332.199 54.0664 331.434 54.9336 330.895C55.8086 330.355 56.8047 330.086 57.9219 330.086C59.6484 330.086 61.043 330.684 62.1055 331.879C63.1758 333.074 63.7109 334.664 63.7109 336.648V336.801C63.7109 338.035 63.4727 339.145 62.9961 340.129C62.5273 341.105 61.8516 341.867 60.9688 342.414C60.0938 342.961 59.0859 343.234 57.9453 343.234C56.2266 343.234 54.832 342.637 53.7617 341.441C52.6992 340.246 52.168 338.664 52.168 336.695V336.543ZM54.3477 336.801C54.3477 338.207 54.6719 339.336 55.3203 340.188C55.9766 341.039 56.8516 341.465 57.9453 341.465C59.0469 341.465 59.9219 341.035 60.5703 340.176C61.2188 339.309 61.543 338.098 61.543 336.543C61.543 335.152 61.2109 334.027 60.5469 333.168C59.8906 332.301 59.0156 331.867 57.9219 331.867C56.8516 331.867 55.9883 332.293 55.332 333.145C54.6758 333.996 54.3477 335.215 54.3477 336.801ZM65.8555 336.543C65.8555 335.301 66.0977 334.184 66.582 333.191C67.0742 332.199 67.7539 331.434 68.6211 330.895C69.4961 330.355 70.4922 330.086 71.6094 330.086C73.3359 330.086 74.7305 330.684 75.793 331.879C76.8633 333.074 77.3984 334.664 77.3984 336.648V336.801C77.3984 338.035 77.1602 339.145 76.6836 340.129C76.2148 341.105 75.5391 341.867 74.6562 342.414C73.7812 342.961 72.7734 343.234 71.6328 343.234C69.9141 343.234 68.5195 342.637 67.4492 341.441C66.3867 340.246 65.8555 338.664 65.8555 336.695V336.543ZM68.0352 336.801C68.0352 338.207 68.3594 339.336 69.0078 340.188C69.6641 341.039 70.5391 341.465 71.6328 341.465C72.7344 341.465 73.6094 341.035 74.2578 340.176C74.9062 339.309 75.2305 338.098 75.2305 336.543C75.2305 335.152 74.8984 334.027 74.2344 333.168C73.5781 332.301 72.7031 331.867 71.6094 331.867C70.5391 331.867 69.6758 332.293 69.0195 333.145C68.3633 333.996 68.0352 335.215 68.0352 336.801ZM86.2461 332.266C85.918 332.211 85.5625 332.184 85.1797 332.184C83.7578 332.184 82.793 332.789 82.2852 334V343H80.1172V330.32H82.2266L82.2617 331.785C82.9727 330.652 83.9805 330.086 85.2852 330.086C85.707 330.086 86.0273 330.141 86.2461 330.25V332.266ZM98.7148 336.637H92.9961V334.867H98.7148V336.637ZM113.691 343H111.512V328.551L107.141 330.156V328.188L113.352 325.855H113.691V343ZM130.742 335.723C130.742 338.262 130.309 340.148 129.441 341.383C128.574 342.617 127.219 343.234 125.375 343.234C123.555 343.234 122.207 342.633 121.332 341.43C120.457 340.219 120.004 338.414 119.973 336.016V333.121C119.973 330.613 120.406 328.75 121.273 327.531C122.141 326.312 123.5 325.703 125.352 325.703C127.188 325.703 128.539 326.293 129.406 327.473C130.273 328.645 130.719 330.457 130.742 332.91V335.723ZM128.574 332.758C128.574 330.922 128.316 329.586 127.801 328.75C127.285 327.906 126.469 327.484 125.352 327.484C124.242 327.484 123.434 327.902 122.926 328.738C122.418 329.574 122.156 330.859 122.141 332.594V336.062C122.141 337.906 122.406 339.27 122.938 340.152C123.477 341.027 124.289 341.465 125.375 341.465C126.445 341.465 127.238 341.051 127.754 340.223C128.277 339.395 128.551 338.09 128.574 336.309V332.758Z" fill="#77777D"/>

      </svg>
  );
}
