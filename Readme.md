# react-draw-particles

react-draw-particles is a react base component for drawing text and svg using particles

[ParticlesText](https://codesandbox.io/s/react-draw-particles-ftje0)
## Installation

Use the package manager [npm](https://www.npmjs.com/package/react-draw-particles) to install .

```bash
npm install react-draw-particles

```

## Usage

```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { ParticlesText } from 'react-draw-particles';
    ReactDOM.render(
        <ParticlesText />,
        document.getElementById('root'),
    );
```

prop | type | default value | info
--- | --- | --- | ---
width | number | window.innerWidth | canvas width
height| number | window.innerHeight | canvas height
colors | string[] | ['#700146','#7d0186', '#8c00ff','#e55785'] | list of particles colors
text | string | "Particles" | text to fill with particles

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)