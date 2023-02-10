import React,{useEffect, useState} from 'react';

export default function Floor0(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("00"))
  })

  return (
    <svg>
      {
        exist ?<path d="M1834.94 1415.09C1844.02 1420.33 1844.02 1428.84 1834.94 1434.09L1275.4 1757.11C1267.85 1761.47 1256.13 1762.3 1246.97 1759.13L945.44 1654.64C943.81 1654.08 942.306 1653.4 940.961 1652.62L516.071 1407.33C514.679 1406.53 513.469 1405.63 512.471 1404.65L340.462 1235.91C335.084 1230.63 336.565 1223.92 344.063 1219.59L903.727 896.499C912.815 891.253 927.549 891.253 936.637 896.499L1834.94 1415.09Z" fill="#002171" stroke="#1DE84A" strokeWidth="4"/>
        :  <path d="M1834.94 1415.09C1844.02 1420.33 1844.02 1428.84 1834.94 1434.09L1275.4 1757.11C1267.85 1761.47 1256.13 1762.3 1246.97 1759.13L945.44 1654.64C943.81 1654.08 942.306 1653.4 940.961 1652.62L516.071 1407.33C514.679 1406.53 513.469 1405.63 512.471 1404.65L340.462 1235.91C335.084 1230.63 336.565 1223.92 344.063 1219.59L903.727 896.499C912.815 891.253 927.549 891.253 936.637 896.499L1834.94 1415.09Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
      }
      {
        exist ? <line x1="0.0147055" y1="1248" x2="268.015" y2="1249.97" stroke="#1DE84A" strokeWidth="4"/>
          :<line x1="0.0147055" y1="1248" x2="268.015" y2="1249.97" stroke="#CFCFCF" strokeWidth="4"/>
      }
<path d="M1834.94 1415.09C1844.02 1420.33 1844.02 1428.84 1834.94 1434.09L1275.4 1757.11C1267.85 1761.47 1256.13 1762.3 1246.97 1759.13L945.44 1654.64C943.81 1654.08 942.306 1653.4 940.961 1652.62L516.071 1407.33C514.679 1406.53 513.469 1405.63 512.471 1404.65L340.462 1235.91C335.084 1230.63 336.565 1223.92 344.063 1219.59L903.727 896.499C912.815 891.253 927.549 891.253 936.637 896.499L1834.94 1415.09Z" fill="#002171" stroke="#1DE84A" strokeWidth="4"/>
<path d="M840.22 1195.4C842.612 1196.78 842.612 1199.02 840.22 1200.4L552.678 1366.4C549.917 1367.99 545.311 1367.71 543.198 1365.81L380.33 1219.71C378.77 1218.31 379.111 1216.47 381.149 1215.3L623.586 1075.34C625.978 1073.96 629.855 1073.96 632.247 1075.34L840.22 1195.4Z" fill="#5472D3" fillOpacity="0.5"/>
<path d="M1613.4 1526.21C1615.79 1527.59 1615.79 1529.83 1613.4 1531.21L1276.27 1725.84C1274.26 1726.99 1271.15 1727.2 1268.73 1726.35L1038.03 1644.48C1034.65 1643.28 1034.11 1640.57 1036.91 1638.96L1419.44 1419.23C1421.84 1417.85 1425.7 1417.85 1428.09 1419.23L1613.4 1526.21Z" fill="#5472D3" fillOpacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1817.33 1414.81)" fill="#5472D3" fillOpacity="0.5"/>
<path d="M43.3906 1223.46H36.2305V1231H33.9805V1213.94H44.5508V1215.79H36.2305V1221.62H43.3906V1223.46ZM49.2617 1231H47.0938V1213H49.2617V1231ZM52.168 1224.54C52.168 1223.3 52.4102 1222.18 52.8945 1221.19C53.3867 1220.2 54.0664 1219.43 54.9336 1218.89C55.8086 1218.36 56.8047 1218.09 57.9219 1218.09C59.6484 1218.09 61.043 1218.68 62.1055 1219.88C63.1758 1221.07 63.7109 1222.66 63.7109 1224.65V1224.8C63.7109 1226.04 63.4727 1227.14 62.9961 1228.13C62.5273 1229.11 61.8516 1229.87 60.9688 1230.41C60.0938 1230.96 59.0859 1231.23 57.9453 1231.23C56.2266 1231.23 54.832 1230.64 53.7617 1229.44C52.6992 1228.25 52.168 1226.66 52.168 1224.7V1224.54ZM54.3477 1224.8C54.3477 1226.21 54.6719 1227.34 55.3203 1228.19C55.9766 1229.04 56.8516 1229.46 57.9453 1229.46C59.0469 1229.46 59.9219 1229.04 60.5703 1228.18C61.2188 1227.31 61.543 1226.1 61.543 1224.54C61.543 1223.15 61.2109 1222.03 60.5469 1221.17C59.8906 1220.3 59.0156 1219.87 57.9219 1219.87C56.8516 1219.87 55.9883 1220.29 55.332 1221.14C54.6758 1222 54.3477 1223.21 54.3477 1224.8ZM65.8555 1224.54C65.8555 1223.3 66.0977 1222.18 66.582 1221.19C67.0742 1220.2 67.7539 1219.43 68.6211 1218.89C69.4961 1218.36 70.4922 1218.09 71.6094 1218.09C73.3359 1218.09 74.7305 1218.68 75.793 1219.88C76.8633 1221.07 77.3984 1222.66 77.3984 1224.65V1224.8C77.3984 1226.04 77.1602 1227.14 76.6836 1228.13C76.2148 1229.11 75.5391 1229.87 74.6562 1230.41C73.7812 1230.96 72.7734 1231.23 71.6328 1231.23C69.9141 1231.23 68.5195 1230.64 67.4492 1229.44C66.3867 1228.25 65.8555 1226.66 65.8555 1224.7V1224.54ZM68.0352 1224.8C68.0352 1226.21 68.3594 1227.34 69.0078 1228.19C69.6641 1229.04 70.5391 1229.46 71.6328 1229.46C72.7344 1229.46 73.6094 1229.04 74.2578 1228.18C74.9062 1227.31 75.2305 1226.1 75.2305 1224.54C75.2305 1223.15 74.8984 1222.03 74.2344 1221.17C73.5781 1220.3 72.7031 1219.87 71.6094 1219.87C70.5391 1219.87 69.6758 1220.29 69.0195 1221.14C68.3633 1222 68.0352 1223.21 68.0352 1224.8ZM86.2461 1220.27C85.918 1220.21 85.5625 1220.18 85.1797 1220.18C83.7578 1220.18 82.793 1220.79 82.2852 1222V1231H80.1172V1218.32H82.2266L82.2617 1219.79C82.9727 1218.65 83.9805 1218.09 85.2852 1218.09C85.707 1218.09 86.0273 1218.14 86.2461 1218.25V1220.27ZM98.7148 1224.64H92.9961V1222.87H98.7148V1224.64ZM117.266 1223.72C117.266 1226.26 116.832 1228.15 115.965 1229.38C115.098 1230.62 113.742 1231.23 111.898 1231.23C110.078 1231.23 108.73 1230.63 107.855 1229.43C106.98 1228.22 106.527 1226.41 106.496 1224.02V1221.12C106.496 1218.61 106.93 1216.75 107.797 1215.53C108.664 1214.31 110.023 1213.7 111.875 1213.7C113.711 1213.7 115.062 1214.29 115.93 1215.47C116.797 1216.64 117.242 1218.46 117.266 1220.91V1223.72ZM115.098 1220.76C115.098 1218.92 114.84 1217.59 114.324 1216.75C113.809 1215.91 112.992 1215.48 111.875 1215.48C110.766 1215.48 109.957 1215.9 109.449 1216.74C108.941 1217.57 108.68 1218.86 108.664 1220.59V1224.06C108.664 1225.91 108.93 1227.27 109.461 1228.15C110 1229.03 110.812 1229.46 111.898 1229.46C112.969 1229.46 113.762 1229.05 114.277 1228.22C114.801 1227.39 115.074 1226.09 115.098 1224.31V1220.76Z" fill="#77777D"/>

</svg>

);
}
