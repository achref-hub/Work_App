export const Tick = ({ size }) => (
    <div
      style={{
        width: size,
        height: size,
        margin: "auto",
        display: "inline-block"
      }}
    >
      <style>
        {`
            .circular-chart {
            display: inline-block;
            margin: 10px auto;
            max-width: 80%;
            max-height: 250px;
          }
            .circle {
            stroke: green;
            fill: none;
            stroke-width: 3.8;
            stroke-linecap: round;
            animation: progress 1s ease-out ${true ? "forwards" : "infinite"};
            // transform-origin: center;
          }
            @keyframes progress {
            0% {
              stroke-dasharray: 0, 100;
          }
          }
            .tick {
            fill: none;
            stroke: green;
            stroke-width: 3.8px;
            stroke-linecap: round;
            /* Stroke-dasharray property */
            stroke-dasharray: 50px;
            stroke-dashoffset: 50px;
            animation: move 0.3s ease-out forwards;
            -webkit-animation-delay: 0.3s;
            -moz-animation-delay: 0.3s;
            -o-animation-delay: 0.3s;
            animation-delay: 0.3s;
          }
            @keyframes move {
            100% {
              stroke-dashoffset: 0;
          }
          }
        `}
      </style>
  
      <svg
        class="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path
          class="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      {/* <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div> */}
    </div>
  );
  