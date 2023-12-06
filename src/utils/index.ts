export const wrap = (n: number, max: number) => (n + max) % max;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export class Vec2 {
	constructor(
		public x = 0,
		public y = 0
	) {}

	set(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	lerp(v: Vec2, t: number) {
		this.x = lerp(this.x, v.x, t);
		this.y = lerp(this.y, v.y, t);
	}
}

export const vec2 = (x = 0, y = 0) => new Vec2(x, y);

export const isHTMLElement = (el: unknown): el is HTMLElement => el instanceof HTMLElement;
