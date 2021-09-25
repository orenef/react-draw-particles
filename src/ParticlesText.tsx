import React from 'react';
import { Particle } from './particle';
import './style.css';

interface Props {
	width?: number;
	height?: number;
	colors?: string[];
	text?: string;
}

let amount = 0;

export const ParticlesText: React.FC<Props> = ({
	width = window.innerWidth,
	height = window.innerHeight,
	colors = ['#700146','#7d0186', '#8c00ff','#e55785'],
	text = 'Particles'
}) => {
	const canvasRef =  React.useRef(null);
	let particles: Particle[] = [];
	
	function init() {
		if (!canvasRef || !canvasRef.current) {
			return;
		}
		const context = (canvasRef.current as any).getContext('2d');
		context.clearRect(0, 0, (canvasRef.current as any).width, (canvasRef.current as any).height);

		context.font = `bold ${width/10}px sans-serif`;
		context.textAlign = "center";
		context.fillText(text, width/2, height/2);
	  
		const data  = context.getImageData(0, 0, width, height).data;
		context.clearRect(0, 0, (canvasRef.current as any).width, (canvasRef.current as any).height);
		context.globalCompositeOperation = "screen";
	  
		particles = [];
		for(let i=0;i<width;i+=Math.round(width/150)){
		  for(let j=0;j<height;j+=Math.round(width/150)){
			if(data[ ((i + j * width) * 4) + 3] > 150){
				particles.push(new Particle(context, i, j, colors[Math.floor(Math.random()*6)]));
			}
		  }
		}
		amount = particles.length;
	}

	function animationFunc(){
		if (!canvasRef || !canvasRef.current) {
			return;
		}
		const context = (canvasRef.current as any).getContext('2d');
		requestAnimationFrame(animationFunc);
		context && context.clearRect( 0, 0, (canvasRef.current as any).width, (canvasRef.current as any).height );
		for (let i = 0; i < amount; i++) {
			particles[i].render();
		}
	};

	React.useEffect(() => {
		init();
		animationFunc();
	},[]);

	return (
		<div className="react-text-particles">
			<canvas id="particles-text-canvas" width={width} height={height} ref={canvasRef} />
		</div>
	)
}
