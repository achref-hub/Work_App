import React,{useState,useEffect} from 'react';

export default function Floor8(props) {
  var [exist,setExist]=useState(false)
  useEffect(()=>{
    props.floors && setExist(props.floors.include("08"))
  })
  return (
    <svg>
      
      <path d="M1834.94 722.088C1844.02 727.334 1844.02 735.84 1834.94 741.087L1275.4 1064.11C1267.85 1068.47 1256.13 1069.3 1246.97 1066.13L945.44 961.643C943.81 961.078 942.306 960.4 940.961 959.624L516.071 714.335C514.679 713.531 513.469 712.628 512.471 711.649L340.462 542.906C335.084 537.63 336.565 530.922 344.063 526.593L903.727 203.499C912.815 198.253 927.549 198.253 936.637 203.499L1834.94 722.088Z" fill="#002171" stroke="#5472D3" stroke-width="4"/>
      <path d="M840.22 502.402C842.612 503.782 842.612 506.021 840.22 507.401L552.678 673.399C549.917 674.993 545.311 674.709 543.198 672.813L380.33 526.71C378.77 525.311 379.111 523.474 381.149 522.297L623.586 382.338C625.978 380.958 629.855 380.958 632.247 382.338L840.22 502.402Z" fill="#5472D3" fill-opacity="0.5"/>
<path d="M1613.4 833.211C1615.79 834.591 1615.79 836.83 1613.4 838.21L1276.27 1032.84C1274.26 1033.99 1271.15 1034.2 1268.73 1033.35L1038.03 951.475C1034.65 950.277 1034.11 947.571 1036.91 945.958L1419.44 726.226C1421.84 724.852 1425.7 724.855 1428.09 726.233L1613.4 833.211Z" fill="#5472D3" fill-opacity="0.5"/>
<rect width="172.28" height="115.624" rx="5" transform="matrix(-0.866044 0.499967 -0.866044 -0.499967 1817.33 721.812)" fill="#5472D3" fill-opacity="0.5"/>
<line x1="0.0147055" y1="547" x2="268.015" y2="548.971" stroke="#CFCFCF" stroke-width="4"/>
<path d="M43.3906 522.465H36.2305V530H33.9805V512.938H44.5508V514.789H36.2305V520.625H43.3906V522.465ZM49.2617 530H47.0938V512H49.2617V530ZM52.168 523.543C52.168 522.301 52.4102 521.184 52.8945 520.191C53.3867 519.199 54.0664 518.434 54.9336 517.895C55.8086 517.355 56.8047 517.086 57.9219 517.086C59.6484 517.086 61.043 517.684 62.1055 518.879C63.1758 520.074 63.7109 521.664 63.7109 523.648V523.801C63.7109 525.035 63.4727 526.145 62.9961 527.129C62.5273 528.105 61.8516 528.867 60.9688 529.414C60.0938 529.961 59.0859 530.234 57.9453 530.234C56.2266 530.234 54.832 529.637 53.7617 528.441C52.6992 527.246 52.168 525.664 52.168 523.695V523.543ZM54.3477 523.801C54.3477 525.207 54.6719 526.336 55.3203 527.188C55.9766 528.039 56.8516 528.465 57.9453 528.465C59.0469 528.465 59.9219 528.035 60.5703 527.176C61.2188 526.309 61.543 525.098 61.543 523.543C61.543 522.152 61.2109 521.027 60.5469 520.168C59.8906 519.301 59.0156 518.867 57.9219 518.867C56.8516 518.867 55.9883 519.293 55.332 520.145C54.6758 520.996 54.3477 522.215 54.3477 523.801ZM65.8555 523.543C65.8555 522.301 66.0977 521.184 66.582 520.191C67.0742 519.199 67.7539 518.434 68.6211 517.895C69.4961 517.355 70.4922 517.086 71.6094 517.086C73.3359 517.086 74.7305 517.684 75.793 518.879C76.8633 520.074 77.3984 521.664 77.3984 523.648V523.801C77.3984 525.035 77.1602 526.145 76.6836 527.129C76.2148 528.105 75.5391 528.867 74.6562 529.414C73.7812 529.961 72.7734 530.234 71.6328 530.234C69.9141 530.234 68.5195 529.637 67.4492 528.441C66.3867 527.246 65.8555 525.664 65.8555 523.695V523.543ZM68.0352 523.801C68.0352 525.207 68.3594 526.336 69.0078 527.188C69.6641 528.039 70.5391 528.465 71.6328 528.465C72.7344 528.465 73.6094 528.035 74.2578 527.176C74.9062 526.309 75.2305 525.098 75.2305 523.543C75.2305 522.152 74.8984 521.027 74.2344 520.168C73.5781 519.301 72.7031 518.867 71.6094 518.867C70.5391 518.867 69.6758 519.293 69.0195 520.145C68.3633 520.996 68.0352 522.215 68.0352 523.801ZM86.2461 519.266C85.918 519.211 85.5625 519.184 85.1797 519.184C83.7578 519.184 82.793 519.789 82.2852 521V530H80.1172V517.32H82.2266L82.2617 518.785C82.9727 517.652 83.9805 517.086 85.2852 517.086C85.707 517.086 86.0273 517.141 86.2461 517.25V519.266ZM98.7148 523.637H92.9961V521.867H98.7148V523.637ZM116.914 517.391C116.914 518.242 116.688 519 116.234 519.664C115.789 520.328 115.184 520.848 114.418 521.223C115.309 521.605 116.012 522.164 116.527 522.898C117.051 523.633 117.312 524.465 117.312 525.395C117.312 526.871 116.812 528.047 115.812 528.922C114.82 529.797 113.512 530.234 111.887 530.234C110.246 530.234 108.93 529.797 107.938 528.922C106.953 528.039 106.461 526.863 106.461 525.395C106.461 524.473 106.711 523.641 107.211 522.898C107.719 522.156 108.418 521.594 109.309 521.211C108.551 520.836 107.953 520.316 107.516 519.652C107.078 518.988 106.859 518.234 106.859 517.391C106.859 515.953 107.32 514.812 108.242 513.969C109.164 513.125 110.379 512.703 111.887 512.703C113.387 512.703 114.598 513.125 115.52 513.969C116.449 514.812 116.914 515.953 116.914 517.391ZM115.145 525.348C115.145 524.395 114.84 523.617 114.23 523.016C113.629 522.414 112.84 522.113 111.863 522.113C110.887 522.113 110.102 522.41 109.508 523.004C108.922 523.598 108.629 524.379 108.629 525.348C108.629 526.316 108.914 527.078 109.484 527.633C110.062 528.188 110.863 528.465 111.887 528.465C112.902 528.465 113.699 528.188 114.277 527.633C114.855 527.07 115.145 526.309 115.145 525.348ZM111.887 514.484C111.035 514.484 110.344 514.75 109.812 515.281C109.289 515.805 109.027 516.52 109.027 517.426C109.027 518.293 109.285 518.996 109.801 519.535C110.324 520.066 111.02 520.332 111.887 520.332C112.754 520.332 113.445 520.066 113.961 519.535C114.484 518.996 114.746 518.293 114.746 517.426C114.746 516.559 114.477 515.852 113.938 515.305C113.398 514.758 112.715 514.484 111.887 514.484Z" fill="#77777D"/>
 </svg>
 );
}
