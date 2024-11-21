Component({
  // properties:{
  //   progress:{
  //     type:Number,
  //     value:0,
  //     observer:function(news){
  //       const svgImg = this.loadingSvg('black', this.properties.progress)
  //       this.setData({svgImg})
  //     }
  //   }
  // },
  data: {
    svgImg: ''
  },
  ready(){
        const svgImg = this.loadingSvg('red', this.properties.progress)
        this.setData({svgImg})
  },
  methods: {
    loadingSvg(color = '#eaeaea', progress = 0) {
      const svgXml = `<svg width="135" height="140" viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="${color}">
      <rect y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
               begin="0.5s" dur="1s"
               values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
               repeatCount="indefinite" />
          <animate attributeName="y"
               begin="0.5s" dur="1s"
               values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
               repeatCount="indefinite" />
      </rect>
      <rect x="30" y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
               begin="0.25s" dur="1s"
               values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
               repeatCount="indefinite" />
          <animate attributeName="y"
               begin="0.25s" dur="1s"
               values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
               repeatCount="indefinite" />
      </rect>
      <rect x="60" width="15" height="140" rx="6">
          <animate attributeName="height"
               begin="0s" dur="1s"
               values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
               repeatCount="indefinite" />
          <animate attributeName="y"
               begin="0s" dur="1s"
               values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
               repeatCount="indefinite" />
      </rect>
      <rect x="90" y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
               begin="0.25s" dur="1s"
               values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
               repeatCount="indefinite" />
          <animate attributeName="y"
               begin="0.25s" dur="1s"
               values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
               repeatCount="indefinite" />
      </rect>
      <rect x="120" y="10" width="15" height="120" rx="6">
          <animate attributeName="height"
               begin="0.5s" dur="1s"
               values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear"
               repeatCount="indefinite" />
          <animate attributeName="y"
               begin="0.5s" dur="1s"
               values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
               repeatCount="indefinite" />
      </rect>
  </svg>
  `;
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;
    }
    // loadingSvg(color = '#eaeaea', progress = 0) {
    //   console.log(progress);
    //   const totalLength = 35; // 提前测量并硬编码路径总长度
    //   const svgXml = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 300 300" width="300" height="300">
    //   <g fill="none" stroke="black" stroke-width="20">
    //     <path 
    //       d="M132.7 52.6c-4.4.8-12.5 3.2-18.1 5.4C88.3 68.3 68.3 88.3 58 114.6c-9.3 23.7-9.3 47.1.1 70.9 17.1 43.8 62.8 69.9 108.4 62 33.8-5.9 62.9-29.8 75.4-62 11.9-30.2 8.3-62.6-9.8-90.1-21.4-32.4-61.5-49.7-99.4-42.8M167 63c23.9 4.9 43.5 18 56.7 "
    //       stroke-dasharray="650"
    //       stroke-dashoffset="${650 - 650*progress}"
    //     />
    //   </g>
    // </svg>`;
    //   return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgXml)}`;
    // }

    
  },
});
