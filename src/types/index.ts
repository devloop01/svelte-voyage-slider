export type Vec2 = { x: number; y: number };

export type Mouse = Vec2;

export type WithTarget<Event, Target> = Event & { currentTarget: Target };
