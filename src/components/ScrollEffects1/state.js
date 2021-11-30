

const state = {
  top: 0,
  pages: 0,
  threshold: 4,
  mouse: [0, 0],
  content: [
    {
      tag: '00',
      text: `The Bacchic\nand Dionysiac\nRites`,
      images: ['/images/scroll1/BH41NVu.jpeg', '/images/scroll1/fBoIJLX.jpeg', '/images/scroll1/04zTfWB.jpeg'],
    },
    { tag: '01', text: `The Elysian\nMysteries`, images: ['/images/scroll1/c4cA8UN.jpeg', '/images/scroll1/ajQ73ol.jpeg', '/images/scroll1/gZOmLNU.jpeg'] },
    { tag: '02', text: `The Hiramic\nLegend`, images: ['/images/scroll1/mbFIW1b.jpeg', '/images/scroll1/mlDUVig.jpeg', '/images/scroll1/gwuZrgo.jpeg'] },
  ],
  depthbox: [
    {
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
      text: 'In a void,\nno one could say\nwhy a thing\nonce set in motion\nshould stop anywhere.',
      image: '/images/scroll1/cAKwexj.jpeg',
    },
    {
      depth: -5,
      textColor: '#272727',
      text: 'For why should it stop\nhere rather than here?\nSo that a thing\nwill either be at rest\nor must be moved\nad infinitum.',
      image: '/images/scroll1/04zTfWB.jpeg',
    },
  ],
  lines: [
    { points: [[-20, 0, 0], [-9, 0, 0]], color: "black", lineWidth: 0.5 },
    { points: [[20, 0, 0], [9, 0, 0]], color: "black", lineWidth: 0.5 },
  ]
}

export default state;