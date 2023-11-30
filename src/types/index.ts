export type Mouse = {
	x: number;
	y: number;
};

export type WithTarget<Event, Target> = Event & { currentTarget: Target };
