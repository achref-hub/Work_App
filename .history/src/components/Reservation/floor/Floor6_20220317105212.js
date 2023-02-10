import React,{useState,useEffect} from 'react';

export default function Floor6(props) {
  var [exist , setExist] = useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.includes("06"))
  })
  return (
    <svg>
      {
        exist ?
        :<path d="M1834.94 909.088C1844.02 914.334 1844.02 922.84 1834.94 928.087L1275.4 1251.11C1267.85 1255.47 1256.13 1256.3 1246.97 1253.13L945.44 1148.64C943.81 1148.08 942.306 1147.4 940.961 1146.62L516.071 901.335C514.679 900.531 513.469 899.628 512.471 898.649L340.462 729.906C335.084 724.63 336.565 717.922 344.063 713.593L903.727 390.499C912.815 385.253 927.549 385.253 936.637 390.499L1834.94 909.088Z" fill="#002171" stroke="#5472D3" strokeWidth="4"/>
      }
      {
        exist ? 
        :<line x1="0.0147055" y1="729" x2="268.015" y2="730.971" stroke="#CFCFCF" strokeWidth="4"/>
      }
<path d="M1834.94 909.088C1844.02 914.334 1844.02 922.84 1834.94 928.087L1275.4 1251.11C1267.85 1255.47 1256.13 1256.3 1246.97 1253.13L945.44 1148.64C943.81 1148.08 942.306 1147.4 940.961 1146.62L516.071 901.335C514.679 900.531 513.469 899.628 512.471 898.649L340.462 729.906C335.084 724.63 336.565 717.922 344.063 713.593L903.727 390.499C912.815 385.253 927.549 385.253 936.637 390.499L1834.94 909.088Z" fill="#002171" stroke="#1DE84A" strokeWidth="4"/>
<path d="M840.22 689.402C842.612 690.782 842.612 693.021 840.22 694.401L552.678 860.399C549.917 861.993 545.311 861.709 543.198 859.813L380.33 713.71C378.77 712.311 379.111 710.474 381.149 709.297L623.586 569.338C625.978 567.958 629.855 567.958 632.247 569.338L840.22 689.402Z" fill="#5472D3" fillOpacity="0.5"/>
<path d="M1613.4 1020.21C1615.79 1021.59 1615.79 1023.83 1613.4 1025.21L1276.27 1219.84C1274.26 1220.99 1271.15 1221.2 1268.73 1220.35L1038.03 1138.48C1034.65 1137.28 1034.11 1134.57 1036.91 1132.96L1419.44 913.226C1421.84 911.852 1425.7 911.855 1428.09 913.233L1613.4 1020.21Z" fill="#5472D3" fillOpacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1817.33 908.812)" fill="#5472D3" fillOpacity="0.5"/>

<path d="M43.3906 704.465H36.2305V712H33.9805V694.938H44.5508V696.789H36.2305V702.625H43.3906V704.465ZM49.2617 712H47.0938V694H49.2617V712ZM52.168 705.543C52.168 704.301 52.4102 703.184 52.8945 702.191C53.3867 701.199 54.0664 700.434 54.9336 699.895C55.8086 699.355 56.8047 699.086 57.9219 699.086C59.6484 699.086 61.043 699.684 62.1055 700.879C63.1758 702.074 63.7109 703.664 63.7109 705.648V705.801C63.7109 707.035 63.4727 708.145 62.9961 709.129C62.5273 710.105 61.8516 710.867 60.9688 711.414C60.0938 711.961 59.0859 712.234 57.9453 712.234C56.2266 712.234 54.832 711.637 53.7617 710.441C52.6992 709.246 52.168 707.664 52.168 705.695V705.543ZM54.3477 705.801C54.3477 707.207 54.6719 708.336 55.3203 709.188C55.9766 710.039 56.8516 710.465 57.9453 710.465C59.0469 710.465 59.9219 710.035 60.5703 709.176C61.2188 708.309 61.543 707.098 61.543 705.543C61.543 704.152 61.2109 703.027 60.5469 702.168C59.8906 701.301 59.0156 700.867 57.9219 700.867C56.8516 700.867 55.9883 701.293 55.332 702.145C54.6758 702.996 54.3477 704.215 54.3477 705.801ZM65.8555 705.543C65.8555 704.301 66.0977 703.184 66.582 702.191C67.0742 701.199 67.7539 700.434 68.6211 699.895C69.4961 699.355 70.4922 699.086 71.6094 699.086C73.3359 699.086 74.7305 699.684 75.793 700.879C76.8633 702.074 77.3984 703.664 77.3984 705.648V705.801C77.3984 707.035 77.1602 708.145 76.6836 709.129C76.2148 710.105 75.5391 710.867 74.6562 711.414C73.7812 711.961 72.7734 712.234 71.6328 712.234C69.9141 712.234 68.5195 711.637 67.4492 710.441C66.3867 709.246 65.8555 707.664 65.8555 705.695V705.543ZM68.0352 705.801C68.0352 707.207 68.3594 708.336 69.0078 709.188C69.6641 710.039 70.5391 710.465 71.6328 710.465C72.7344 710.465 73.6094 710.035 74.2578 709.176C74.9062 708.309 75.2305 707.098 75.2305 705.543C75.2305 704.152 74.8984 703.027 74.2344 702.168C73.5781 701.301 72.7031 700.867 71.6094 700.867C70.5391 700.867 69.6758 701.293 69.0195 702.145C68.3633 702.996 68.0352 704.215 68.0352 705.801ZM86.2461 701.266C85.918 701.211 85.5625 701.184 85.1797 701.184C83.7578 701.184 82.793 701.789 82.2852 703V712H80.1172V699.32H82.2266L82.2617 700.785C82.9727 699.652 83.9805 699.086 85.2852 699.086C85.707 699.086 86.0273 699.141 86.2461 699.25V701.266ZM98.7148 705.637H92.9961V703.867H98.7148V705.637ZM115.074 694.926V696.766H114.676C112.988 696.797 111.645 697.297 110.645 698.266C109.645 699.234 109.066 700.598 108.91 702.355C109.809 701.324 111.035 700.809 112.59 700.809C114.074 700.809 115.258 701.332 116.141 702.379C117.031 703.426 117.477 704.777 117.477 706.434C117.477 708.191 116.996 709.598 116.035 710.652C115.082 711.707 113.801 712.234 112.191 712.234C110.559 712.234 109.234 711.609 108.219 710.359C107.203 709.102 106.695 707.484 106.695 705.508V704.676C106.695 701.535 107.363 699.137 108.699 697.48C110.043 695.816 112.039 694.965 114.688 694.926H115.074ZM112.227 702.613C111.484 702.613 110.801 702.836 110.176 703.281C109.551 703.727 109.117 704.285 108.875 704.957V705.754C108.875 707.16 109.191 708.293 109.824 709.152C110.457 710.012 111.246 710.441 112.191 710.441C113.168 710.441 113.934 710.082 114.488 709.363C115.051 708.645 115.332 707.703 115.332 706.539C115.332 705.367 115.047 704.422 114.477 703.703C113.914 702.977 113.164 702.613 112.227 702.613Z" fill="#77777D"/>
  </svg>
  );
}
