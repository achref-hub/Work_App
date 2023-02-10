import React,{useState,useEffect} from 'react';

export default function Floor4(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("04"))
  })
  return (
    <svg>
      {
        exist ? <path d="M1836.94 1090.09C1846.02 1095.33 1846.02 1103.84 1836.94 1109.09L1277.4 1432.11C1269.85 1436.47 1258.13 1437.3 1248.97 1434.13L947.44 1329.64C945.81 1329.08 944.306 1328.4 942.961 1327.62L518.071 1082.33C516.679 1081.53 515.469 1080.63 514.471 1079.65L342.462 910.906C337.084 905.63 338.565 898.922 346.063 894.593L905.727 571.499C914.815 566.253 929.549 566.253 938.637 571.499L1836.94 1090.09Z" fill="#002171" stroke="#1DE84A" strokeWidth="4"/>
        : <path d="M1836.94 1090.09C1846.02 1095.33 1846.02 1103.84 1836.94 1109.09L1277.4 1432.11C1269.85 1436.47 1258.13 1437.3 1248.97 1434.13L947.44 1329.64C945.81 1329.08 944.306 1328.4 942.961 1327.62L518.071 1082.33C516.679 1081.53 515.469 1080.63 514.471 1079.65L342.462 910.906C337.084 905.63 338.565 898.922 346.063 894.593L905.727 571.499C914.815 566.253 929.549 566.253 938.637 571.499L1836.94 1090.09Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
      }
      {
        exist ? <line x1="0.0147055" y1="890" x2="268.015" y2="891.971" stroke="#1DE84A" strokeWidth="4"/>
        :<line x1="0.0147055" y1="890" x2="268.015" y2="891.971" stroke="#CFCFCF" strokeWidth="4"/>
      }
<path d="M842.22 870.402C844.612 871.782 844.612 874.021 842.22 875.401L554.678 1041.4C551.917 1042.99 547.311 1042.71 545.198 1040.81L382.33 894.71C380.77 893.311 381.111 891.474 383.149 890.297L625.586 750.338C627.978 748.958 631.855 748.958 634.247 750.338L842.22 870.402Z" fill="#5472D3" fillOpacity="0.5"/>
<path d="M1615.4 1201.21C1617.79 1202.59 1617.79 1204.83 1615.4 1206.21L1278.27 1400.84C1276.26 1401.99 1273.15 1402.2 1270.73 1401.35L1040.03 1319.48C1036.65 1318.28 1036.11 1315.57 1038.91 1313.96L1421.44 1094.23C1423.84 1092.85 1427.7 1092.85 1430.09 1094.23L1615.4 1201.21Z" fill="#5472D3" fill-opacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1819.33 1089.81)" fill="#5472D3" fill-opacity="0.5"/>
<path d="M43.3906 865.465H36.2305V873H33.9805V855.938H44.5508V857.789H36.2305V863.625H43.3906V865.465ZM49.2617 873H47.0938V855H49.2617V873ZM52.168 866.543C52.168 865.301 52.4102 864.184 52.8945 863.191C53.3867 862.199 54.0664 861.434 54.9336 860.895C55.8086 860.355 56.8047 860.086 57.9219 860.086C59.6484 860.086 61.043 860.684 62.1055 861.879C63.1758 863.074 63.7109 864.664 63.7109 866.648V866.801C63.7109 868.035 63.4727 869.145 62.9961 870.129C62.5273 871.105 61.8516 871.867 60.9688 872.414C60.0938 872.961 59.0859 873.234 57.9453 873.234C56.2266 873.234 54.832 872.637 53.7617 871.441C52.6992 870.246 52.168 868.664 52.168 866.695V866.543ZM54.3477 866.801C54.3477 868.207 54.6719 869.336 55.3203 870.188C55.9766 871.039 56.8516 871.465 57.9453 871.465C59.0469 871.465 59.9219 871.035 60.5703 870.176C61.2188 869.309 61.543 868.098 61.543 866.543C61.543 865.152 61.2109 864.027 60.5469 863.168C59.8906 862.301 59.0156 861.867 57.9219 861.867C56.8516 861.867 55.9883 862.293 55.332 863.145C54.6758 863.996 54.3477 865.215 54.3477 866.801ZM65.8555 866.543C65.8555 865.301 66.0977 864.184 66.582 863.191C67.0742 862.199 67.7539 861.434 68.6211 860.895C69.4961 860.355 70.4922 860.086 71.6094 860.086C73.3359 860.086 74.7305 860.684 75.793 861.879C76.8633 863.074 77.3984 864.664 77.3984 866.648V866.801C77.3984 868.035 77.1602 869.145 76.6836 870.129C76.2148 871.105 75.5391 871.867 74.6562 872.414C73.7812 872.961 72.7734 873.234 71.6328 873.234C69.9141 873.234 68.5195 872.637 67.4492 871.441C66.3867 870.246 65.8555 868.664 65.8555 866.695V866.543ZM68.0352 866.801C68.0352 868.207 68.3594 869.336 69.0078 870.188C69.6641 871.039 70.5391 871.465 71.6328 871.465C72.7344 871.465 73.6094 871.035 74.2578 870.176C74.9062 869.309 75.2305 868.098 75.2305 866.543C75.2305 865.152 74.8984 864.027 74.2344 863.168C73.5781 862.301 72.7031 861.867 71.6094 861.867C70.5391 861.867 69.6758 862.293 69.0195 863.145C68.3633 863.996 68.0352 865.215 68.0352 866.801ZM86.2461 862.266C85.918 862.211 85.5625 862.184 85.1797 862.184C83.7578 862.184 82.793 862.789 82.2852 864V873H80.1172V860.32H82.2266L82.2617 861.785C82.9727 860.652 83.9805 860.086 85.2852 860.086C85.707 860.086 86.0273 860.141 86.2461 860.25V862.266ZM98.7148 866.637H92.9961V864.867H98.7148V866.637ZM115.719 867.27H118.086V869.039H115.719V873H113.539V869.039H105.77V867.762L113.41 855.938H115.719V867.27ZM108.23 867.27H113.539V858.902L113.281 859.371L108.23 867.27Z" fill="#77777D"/>
</svg>
  );
}
