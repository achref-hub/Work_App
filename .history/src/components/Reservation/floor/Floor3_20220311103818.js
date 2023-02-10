import React,{useState,useEffect} from 'react';

export default function Floor3(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("03"))
  })
  return (
    <svg>
      {
        exist ?  <path d="M1836.94 1171.09C1846.02 1176.33 1846.02 1184.84 1836.94 1190.09L1277.4 1513.11C1269.85 1517.47 1258.13 1518.3 1248.97 1515.13L947.44 1410.64C945.81 1410.08 944.306 1409.4 942.961 1408.62L518.071 1163.33C516.679 1162.53 515.469 1161.63 514.471 1160.65L342.462 991.906C337.084 986.63 338.565 979.922 346.063 975.593L905.727 652.499C914.815 647.253 929.549 647.253 938.637 652.499L1836.94 1171.09Z" fill="#002171" stroke="#1DE84A" stroke-width="4"/>
        :<path d="M1836.94 1171.09C1846.02 1176.33 1846.02 1184.84 1836.94 1190.09L1277.4 1513.11C1269.85 1517.47 1258.13 1518.3 1248.97 1515.13L947.44 1410.64C945.81 1410.08 944.306 1409.4 942.961 1408.62L518.071 1163.33C516.679 1162.53 515.469 1161.63 514.471 1160.65L342.462 991.906C337.084 986.63 338.565 979.922 346.063 975.593L905.727 652.499C914.815 647.253 929.549 647.253 938.637 652.499L1836.94 1171.09Z" fill="#002171" stroke="#5472D3" stroke-width="4"/>

      }
      {
        exist ? <line x1="0.0147055" y1="973" x2="268.015" y2="974.971" stroke="#CFCFCF" stroke-width="4"/>
        : <line x1="0.0147055" y1="973" x2="268.015" y2="974.971" stroke="#CFCFCF" stroke-width="4"/>
      }
<path d="M842.22 951.402C844.612 952.782 844.612 955.021 842.22 956.401L554.678 1122.4C551.917 1123.99 547.311 1123.71 545.198 1121.81L382.33 975.71C380.77 974.311 381.111 972.474 383.149 971.297L625.586 831.338C627.978 829.958 631.855 829.958 634.247 831.338L842.22 951.402Z" fill="#5472D3" fill-opacity="0.5"/>
<path d="M1615.4 1282.21C1617.79 1283.59 1617.79 1285.83 1615.4 1287.21L1278.27 1481.84C1276.26 1482.99 1273.15 1483.2 1270.73 1482.35L1040.03 1400.48C1036.65 1399.28 1036.11 1396.57 1038.91 1394.96L1421.44 1175.23C1423.84 1173.85 1427.7 1173.85 1430.09 1175.23L1615.4 1282.21Z" fill="#5472D3" fill-opacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1819.33 1170.81)" fill="#5472D3" fill-opacity="0.5"/>
<path d="M43.3906 948.465H36.2305V956H33.9805V938.938H44.5508V940.789H36.2305V946.625H43.3906V948.465ZM49.2617 956H47.0938V938H49.2617V956ZM52.168 949.543C52.168 948.301 52.4102 947.184 52.8945 946.191C53.3867 945.199 54.0664 944.434 54.9336 943.895C55.8086 943.355 56.8047 943.086 57.9219 943.086C59.6484 943.086 61.043 943.684 62.1055 944.879C63.1758 946.074 63.7109 947.664 63.7109 949.648V949.801C63.7109 951.035 63.4727 952.145 62.9961 953.129C62.5273 954.105 61.8516 954.867 60.9688 955.414C60.0938 955.961 59.0859 956.234 57.9453 956.234C56.2266 956.234 54.832 955.637 53.7617 954.441C52.6992 953.246 52.168 951.664 52.168 949.695V949.543ZM54.3477 949.801C54.3477 951.207 54.6719 952.336 55.3203 953.188C55.9766 954.039 56.8516 954.465 57.9453 954.465C59.0469 954.465 59.9219 954.035 60.5703 953.176C61.2188 952.309 61.543 951.098 61.543 949.543C61.543 948.152 61.2109 947.027 60.5469 946.168C59.8906 945.301 59.0156 944.867 57.9219 944.867C56.8516 944.867 55.9883 945.293 55.332 946.145C54.6758 946.996 54.3477 948.215 54.3477 949.801ZM65.8555 949.543C65.8555 948.301 66.0977 947.184 66.582 946.191C67.0742 945.199 67.7539 944.434 68.6211 943.895C69.4961 943.355 70.4922 943.086 71.6094 943.086C73.3359 943.086 74.7305 943.684 75.793 944.879C76.8633 946.074 77.3984 947.664 77.3984 949.648V949.801C77.3984 951.035 77.1602 952.145 76.6836 953.129C76.2148 954.105 75.5391 954.867 74.6562 955.414C73.7812 955.961 72.7734 956.234 71.6328 956.234C69.9141 956.234 68.5195 955.637 67.4492 954.441C66.3867 953.246 65.8555 951.664 65.8555 949.695V949.543ZM68.0352 949.801C68.0352 951.207 68.3594 952.336 69.0078 953.188C69.6641 954.039 70.5391 954.465 71.6328 954.465C72.7344 954.465 73.6094 954.035 74.2578 953.176C74.9062 952.309 75.2305 951.098 75.2305 949.543C75.2305 948.152 74.8984 947.027 74.2344 946.168C73.5781 945.301 72.7031 944.867 71.6094 944.867C70.5391 944.867 69.6758 945.293 69.0195 946.145C68.3633 946.996 68.0352 948.215 68.0352 949.801ZM86.2461 945.266C85.918 945.211 85.5625 945.184 85.1797 945.184C83.7578 945.184 82.793 945.789 82.2852 947V956H80.1172V943.32H82.2266L82.2617 944.785C82.9727 943.652 83.9805 943.086 85.2852 943.086C85.707 943.086 86.0273 943.141 86.2461 943.25V945.266ZM98.7148 949.637H92.9961V947.867H98.7148V949.637ZM109.719 946.414H111.348C112.371 946.398 113.176 946.129 113.762 945.605C114.348 945.082 114.641 944.375 114.641 943.484C114.641 941.484 113.645 940.484 111.652 940.484C110.715 940.484 109.965 940.754 109.402 941.293C108.848 941.824 108.57 942.531 108.57 943.414H106.402C106.402 942.062 106.895 940.941 107.879 940.051C108.871 939.152 110.129 938.703 111.652 938.703C113.262 938.703 114.523 939.129 115.438 939.98C116.352 940.832 116.809 942.016 116.809 943.531C116.809 944.273 116.566 944.992 116.082 945.688C115.605 946.383 114.953 946.902 114.125 947.246C115.062 947.543 115.785 948.035 116.293 948.723C116.809 949.41 117.066 950.25 117.066 951.242C117.066 952.773 116.566 953.988 115.566 954.887C114.566 955.785 113.266 956.234 111.664 956.234C110.062 956.234 108.758 955.801 107.75 954.934C106.75 954.066 106.25 952.922 106.25 951.5H108.43C108.43 952.398 108.723 953.117 109.309 953.656C109.895 954.195 110.68 954.465 111.664 954.465C112.711 954.465 113.512 954.191 114.066 953.645C114.621 953.098 114.898 952.312 114.898 951.289C114.898 950.297 114.594 949.535 113.984 949.004C113.375 948.473 112.496 948.199 111.348 948.184H109.719V946.414Z" fill="#77777D"/>
</svg>
 );
}
