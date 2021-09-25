
/**
 * particle class
 */
export class Particle {
	context: CanvasRenderingContext2D | null;
	dest: { x: number, y: number};
	r: number;
	vx: number;
	vy: number;
	accX: number;
	accY: number;
	friction: number;
	color: string;
	x: number;
	y: number;
	
	constructor( context: CanvasRenderingContext2D | null, x: number, y: number, color: string) {
		this.context = context;
		this.color = color;
		this.dest = { x, y};
		this.vx = (Math.random()-0.5)*20;;
		this.vy = (Math.random()-0.5)*20;
		this.accX = 0;
		this.accY = 0;
		this.x = x;
		this.y = y;
		this.r = Math.random() * 5 + 2;
		this.friction = Math.random()*0.05 + 0.94;;
	}
	
	render() {
		this.accX = (this.dest.x - this.x)/1000;
		this.accY = (this.dest.y - this.y)/1000;
		this.vx += this.accX;
		this.vy += this.accY;
		this.vx *= this.friction;
		this.vy *= this.friction;
	  
		this.x += this.vx;
		this.y +=  this.vy;
		if (this.context) {
			this.context.fillStyle = this.color;
			this.context.beginPath();
			this.context.arc(this.x, this.y, this.r, Math.PI * 2, 0,false);
			this.context.fill();
		}
	  
	}
}
