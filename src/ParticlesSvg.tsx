import React from 'react';
import { Particle } from './particle';
import './style.css';

interface Props {
	width?: number;
	height?: number;
	colors?: string[];
	svg?: any;
}

function createImage(path: string) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject({path, status: 'error'});
		img.src = path;
	});
}

export const ParticlesSvg: React.FC<Props> = ({
	width = window.innerWidth,
	height = window.innerHeight,
	colors = ['#700146','#7d0186', '#8c00ff','#e55785'],
	svg = undefined,
}) => {

	const canvasRef =  React.useRef(null);
	const amount =  React.useRef(0);
	const [errorLoading, setErrorLoading] = React.useState(false);
	let particles: Particle[] = [];
	
	async function init() {
		if (!canvasRef || !canvasRef.current || !svg || errorLoading) {
			return;
		}
		const context = (canvasRef.current as any).getContext('2d');
		context.clearRect(0, 0, (canvasRef.current as any).width, (canvasRef.current as any).height);

		const src = "data:image/svg+xml," + encodeURIComponent(svg);
		let img : any = undefined;
		try {
			img = await createImage(src);
		} catch (error) {
			setErrorLoading(true);
			return;
		}
		context.drawImage(img, width/2 - (img.width/2), height/2 - (img.height/2), img.width, img.height);
	
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
		amount.current = particles.length;
	}

	function animationFunc(){
		if (!canvasRef || !canvasRef.current) {
			return;
		}
		const context = (canvasRef.current as any).getContext('2d');
		requestAnimationFrame(animationFunc);
		context && context.clearRect( 0, 0, (canvasRef.current as any).width, (canvasRef.current as any).height );
		for (let i = 0; i < amount.current; i++) {
			particles[i].render();
		}
	};

	React.useEffect(() => {
		init();
		animationFunc();
	},[]);

	return (
		<div className="react-svg-particles">
			<canvas id="particles-svg-canvas" width={width} height={height} ref={canvasRef} />
		</div>
	)
}
