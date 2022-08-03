import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import './style.css';
import * as echarts from 'echarts';

function App() {
  const imageURLs = [
    'http://placekitten.com/148/148',
    'http://placekitten.com/248/248',
    'https://images.squarespace-cdn.com/content/v1/543593e4e4b0bf8b316933e3/1504286897079-V3OLCF6NQ1P06SZSE2G1/image-asset.png',
  ];

  const canvas = useRef();
  const [ctx, setCtx] = useState(null);
  const [value, setValue] = useState(0);
  const onChange = (event) => {
    // console.log(event.target.value);
    setValue(event.target.value);
    console.log(
      'onchange:value',
      value,
      'onchange:event.target.value',
      event.target.value
    );
    // drawImage(imageURLs[event.target.value]);
  };

  const chartRef = useRef(null);
  const [options, setOptions] = useState({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);
    }
  }, [options, chartRef]);

  useEffect(() => {
    drawImage(imageURLs[value]);
  }, [value, ctx]);

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    console.log(canvasEle.width);
    // get context of the canvas
    //ctx = canvasEle.getContext('2d');
    setCtx(canvasEle.getContext('2d'));
    console.log('useEffect-ctx', ctx);
    //console.log(canvas);
  }, []);

  window.onkeydown = (e) => {
    e.key == 'ArrowRight' ? setValue((prev) => Math.min(prev + 1, 2)) : null;
    e.key == 'ArrowLeft' ? setValue((prev) => Math.max(prev - 1, 0)) : null;
    console.log(e.key, value);
  };
  //useEffect(()=>{
  //    drawImage(imageURLs[value]);
  //  }, [value]);

  const drawImage = (url) => {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      ctx != null ? ctx.drawImage(img, 0, 0, 400, 300) : null;
    };
  };

  return (
    <div className="App">
      <input
        type="range"
        className="slider"
        min="0"
        max="2"
        value={value}
        onChange={onChange}
      />
      <div id="output">{value}</div>
      <canvas ref={canvas}></canvas>
      <div
        ref={chartRef}
        style={{
          width: '400px',
          height: '300px',
        }}
      />
    </div>
  );
}

export default App;

render(<App />, document.getElementById('root'));
