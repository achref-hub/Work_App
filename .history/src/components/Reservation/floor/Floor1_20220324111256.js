import React, {useState,useEffect} from 'react';

export default function Floor1(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("01"))
  })
  return (
    <svg>
      {
        exist ?  <path d="M1836.94 1333.09C1846.02 1338.33 1846.02 1346.84 1836.94 1352.09L1277.4 1675.11C1269.85 1679.47 1258.13 1680.3 1248.97 1677.13L947.44 1572.64C945.81 1572.08 944.306 1571.4 942.961 1570.62L518.071 1325.33C516.679 1324.53 515.469 1323.63 514.471 1322.65L342.462 1153.91C337.084 1148.63 338.565 1141.92 346.063 1137.59L905.727 814.499C914.815 809.253 929.549 809.253 938.637 814.499L1836.94 1333.09Z" fill="#002171" stroke="#1DE84A" strokeWidth="4"/>
        :  <path d="M1836.94 1333.09C1846.02 1338.33 1846.02 1346.84 1836.94 1352.09L1277.4 1675.11C1269.85 1679.47 1258.13 1680.3 1248.97 1677.13L947.44 1572.64C945.81 1572.08 944.306 1571.4 942.961 1570.62L518.071 1325.33C516.679 1324.53 515.469 1323.63 514.471 1322.65L342.462 1153.91C337.084 1148.63 338.565 1141.92 346.063 1137.59L905.727 814.499C914.815 809.253 929.549 809.253 938.637 814.499L1836.94 1333.09Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
      }
      {
        exist ? <line x1="0.0147055" y1="1154" x2="268.015" y2="1155.97" stroke="#    " strokeWidth="4"/>
        : <line x1="0.0147055" y1="1154" x2="268.015" y2="1155.97" stroke="#CFCFCF" strokeWidth="4"/>
      }
<path d="M842.22 1113.4C844.612 1114.78 844.612 1117.02 842.22 1118.4L554.678 1284.4C551.917 1285.99 547.311 1285.71 545.198 1283.81L382.33 1137.71C380.77 1136.31 381.111 1134.47 383.149 1133.3L625.586 993.338C627.978 991.958 631.855 991.958 634.247 993.338L842.22 1113.4Z" fill="#5472D3" fillOpacity="0.5"/>
<path d="M1615.4 1444.21C1617.79 1445.59 1617.79 1447.83 1615.4 1449.21L1278.27 1643.84C1276.26 1644.99 1273.15 1645.2 1270.73 1644.35L1040.03 1562.48C1036.65 1561.28 1036.11 1558.57 1038.91 1556.96L1421.44 1337.23C1423.84 1335.85 1427.7 1335.85 1430.09 1337.23L1615.4 1444.21Z" fill="#5472D3" fillOpacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1819.33 1332.81)" fill="#5472D3" fillOpacity="0.5"/>
<path d="M43.3906 1129.46H36.2305V1137H33.9805V1119.94H44.5508V1121.79H36.2305V1127.62H43.3906V1129.46ZM49.2617 1137H47.0938V1119H49.2617V1137ZM52.168 1130.54C52.168 1129.3 52.4102 1128.18 52.8945 1127.19C53.3867 1126.2 54.0664 1125.43 54.9336 1124.89C55.8086 1124.36 56.8047 1124.09 57.9219 1124.09C59.6484 1124.09 61.043 1124.68 62.1055 1125.88C63.1758 1127.07 63.7109 1128.66 63.7109 1130.65V1130.8C63.7109 1132.04 63.4727 1133.14 62.9961 1134.13C62.5273 1135.11 61.8516 1135.87 60.9688 1136.41C60.0938 1136.96 59.0859 1137.23 57.9453 1137.23C56.2266 1137.23 54.832 1136.64 53.7617 1135.44C52.6992 1134.25 52.168 1132.66 52.168 1130.7V1130.54ZM54.3477 1130.8C54.3477 1132.21 54.6719 1133.34 55.3203 1134.19C55.9766 1135.04 56.8516 1135.46 57.9453 1135.46C59.0469 1135.46 59.9219 1135.04 60.5703 1134.18C61.2188 1133.31 61.543 1132.1 61.543 1130.54C61.543 1129.15 61.2109 1128.03 60.5469 1127.17C59.8906 1126.3 59.0156 1125.87 57.9219 1125.87C56.8516 1125.87 55.9883 1126.29 55.332 1127.14C54.6758 1128 54.3477 1129.21 54.3477 1130.8ZM65.8555 1130.54C65.8555 1129.3 66.0977 1128.18 66.582 1127.19C67.0742 1126.2 67.7539 1125.43 68.6211 1124.89C69.4961 1124.36 70.4922 1124.09 71.6094 1124.09C73.3359 1124.09 74.7305 1124.68 75.793 1125.88C76.8633 1127.07 77.3984 1128.66 77.3984 1130.65V1130.8C77.3984 1132.04 77.1602 1133.14 76.6836 1134.13C76.2148 1135.11 75.5391 1135.87 74.6562 1136.41C73.7812 1136.96 72.7734 1137.23 71.6328 1137.23C69.9141 1137.23 68.5195 1136.64 67.4492 1135.44C66.3867 1134.25 65.8555 1132.66 65.8555 1130.7V1130.54ZM68.0352 1130.8C68.0352 1132.21 68.3594 1133.34 69.0078 1134.19C69.6641 1135.04 70.5391 1135.46 71.6328 1135.46C72.7344 1135.46 73.6094 1135.04 74.2578 1134.18C74.9062 1133.31 75.2305 1132.1 75.2305 1130.54C75.2305 1129.15 74.8984 1128.03 74.2344 1127.17C73.5781 1126.3 72.7031 1125.87 71.6094 1125.87C70.5391 1125.87 69.6758 1126.29 69.0195 1127.14C68.3633 1128 68.0352 1129.21 68.0352 1130.8ZM86.2461 1126.27C85.918 1126.21 85.5625 1126.18 85.1797 1126.18C83.7578 1126.18 82.793 1126.79 82.2852 1128V1137H80.1172V1124.32H82.2266L82.2617 1125.79C82.9727 1124.65 83.9805 1124.09 85.2852 1124.09C85.707 1124.09 86.0273 1124.14 86.2461 1124.25V1126.27ZM98.7148 1130.64H92.9961V1128.87H98.7148V1130.64ZM113.691 1137H111.512V1122.55L107.141 1124.16V1122.19L113.352 1119.86H113.691V1137Z" fill="#77777D"/>

</svg>
  );
}
