import React , {useEffect, useState} from 'react';

export default function Floor2(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("02"))
  })
  return (
    <svg>
      {
        exist ? <path d="M1836.94 1252.09C1846.02 1257.33 1846.02 1265.84 1836.94 1271.09L1277.4 1594.11C1269.85 1598.47 1258.13 1599.3 1248.97 1596.13L947.44 1491.64C945.81 1491.08 944.306 1490.4 942.961 1489.62L518.071 1244.33C516.679 1243.53 515.469 1242.63 514.471 1241.65L342.462 1072.91C337.084 1067.63 338.565 1060.92 346.063 1056.59L905.727 733.499C914.815 728.253 929.549 728.253 938.637 733.499L1836.94 1252.09Z" fill="#002171" stroke="#1DE84A" strokeWidth="4"/>
        : <path d="M1836.94 1252.09C1846.02 1257.33 1846.02 1265.84 1836.94 1271.09L1277.4 1594.11C1269.85 1598.47 1258.13 1599.3 1248.97 1596.13L947.44 1491.64C945.81 1491.08 944.306 1490.4 942.961 1489.62L518.071 1244.33C516.679 1243.53 515.469 1242.63 514.471 1241.65L342.462 1072.91C337.084 1067.63 338.565 1060.92 346.063 1056.59L905.727 733.499C914.815 728.253 929.549 728.253 938.637 733.499L1836.94 1252.09Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
      }
      {
        exist ? <line x1="0.0147055" y1="1060" x2="268.015" y2="1061.97" stroke="#1DE84A" strokeWidth="4"/>
        :<line x1="0.0147055" y1="1060" x2="268.015" y2="1061.97" stroke="#CFCFCF" strokeWidth="4"/>
      }
      
<path d="M842.22 1032.4C844.612 1033.78 844.612 1036.02 842.22 1037.4L554.678 1203.4C551.917 1204.99 547.311 1204.71 545.198 1202.81L382.33 1056.71C380.77 1055.31 381.111 1053.47 383.149 1052.3L625.586 912.338C627.978 910.958 631.855 910.958 634.247 912.338L842.22 1032.4Z" fill="#5472D3" fill-opacity="0.5"/>
<path d="M1615.4 1363.21C1617.79 1364.59 1617.79 1366.83 1615.4 1368.21L1278.27 1562.84C1276.26 1563.99 1273.15 1564.2 1270.73 1563.35L1040.03 1481.48C1036.65 1480.28 1036.11 1477.57 1038.91 1475.96L1421.44 1256.23C1423.84 1254.85 1427.7 1254.85 1430.09 1256.23L1615.4 1363.21Z" fill="#5472D3" fill-opacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1819.33 1251.81)" fill="#5472D3" fill-opacity="0.5"/>


<path d="M43.3906 1035.46H36.2305V1043H33.9805V1025.94H44.5508V1027.79H36.2305V1033.62H43.3906V1035.46ZM49.2617 1043H47.0938V1025H49.2617V1043ZM52.168 1036.54C52.168 1035.3 52.4102 1034.18 52.8945 1033.19C53.3867 1032.2 54.0664 1031.43 54.9336 1030.89C55.8086 1030.36 56.8047 1030.09 57.9219 1030.09C59.6484 1030.09 61.043 1030.68 62.1055 1031.88C63.1758 1033.07 63.7109 1034.66 63.7109 1036.65V1036.8C63.7109 1038.04 63.4727 1039.14 62.9961 1040.13C62.5273 1041.11 61.8516 1041.87 60.9688 1042.41C60.0938 1042.96 59.0859 1043.23 57.9453 1043.23C56.2266 1043.23 54.832 1042.64 53.7617 1041.44C52.6992 1040.25 52.168 1038.66 52.168 1036.7V1036.54ZM54.3477 1036.8C54.3477 1038.21 54.6719 1039.34 55.3203 1040.19C55.9766 1041.04 56.8516 1041.46 57.9453 1041.46C59.0469 1041.46 59.9219 1041.04 60.5703 1040.18C61.2188 1039.31 61.543 1038.1 61.543 1036.54C61.543 1035.15 61.2109 1034.03 60.5469 1033.17C59.8906 1032.3 59.0156 1031.87 57.9219 1031.87C56.8516 1031.87 55.9883 1032.29 55.332 1033.14C54.6758 1034 54.3477 1035.21 54.3477 1036.8ZM65.8555 1036.54C65.8555 1035.3 66.0977 1034.18 66.582 1033.19C67.0742 1032.2 67.7539 1031.43 68.6211 1030.89C69.4961 1030.36 70.4922 1030.09 71.6094 1030.09C73.3359 1030.09 74.7305 1030.68 75.793 1031.88C76.8633 1033.07 77.3984 1034.66 77.3984 1036.65V1036.8C77.3984 1038.04 77.1602 1039.14 76.6836 1040.13C76.2148 1041.11 75.5391 1041.87 74.6562 1042.41C73.7812 1042.96 72.7734 1043.23 71.6328 1043.23C69.9141 1043.23 68.5195 1042.64 67.4492 1041.44C66.3867 1040.25 65.8555 1038.66 65.8555 1036.7V1036.54ZM68.0352 1036.8C68.0352 1038.21 68.3594 1039.34 69.0078 1040.19C69.6641 1041.04 70.5391 1041.46 71.6328 1041.46C72.7344 1041.46 73.6094 1041.04 74.2578 1040.18C74.9062 1039.31 75.2305 1038.1 75.2305 1036.54C75.2305 1035.15 74.8984 1034.03 74.2344 1033.17C73.5781 1032.3 72.7031 1031.87 71.6094 1031.87C70.5391 1031.87 69.6758 1032.29 69.0195 1033.14C68.3633 1034 68.0352 1035.21 68.0352 1036.8ZM86.2461 1032.27C85.918 1032.21 85.5625 1032.18 85.1797 1032.18C83.7578 1032.18 82.793 1032.79 82.2852 1034V1043H80.1172V1030.32H82.2266L82.2617 1031.79C82.9727 1030.65 83.9805 1030.09 85.2852 1030.09C85.707 1030.09 86.0273 1030.14 86.2461 1030.25V1032.27ZM98.7148 1036.64H92.9961V1034.87H98.7148V1036.64ZM117.746 1043H106.566V1041.44L112.473 1034.88C113.348 1033.89 113.949 1033.08 114.277 1032.46C114.613 1031.84 114.781 1031.2 114.781 1030.53C114.781 1029.64 114.512 1028.91 113.973 1028.34C113.434 1027.77 112.715 1027.48 111.816 1027.48C110.738 1027.48 109.898 1027.79 109.297 1028.41C108.703 1029.02 108.406 1029.87 108.406 1030.96H106.238C106.238 1029.39 106.742 1028.12 107.75 1027.16C108.766 1026.19 110.121 1025.7 111.816 1025.7C113.402 1025.7 114.656 1026.12 115.578 1026.96C116.5 1027.79 116.961 1028.89 116.961 1030.27C116.961 1031.95 115.891 1033.95 113.75 1036.27L109.18 1041.23H117.746V1043Z" fill="#77777D"/>
</svg>
  );
}
