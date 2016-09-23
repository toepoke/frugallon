// simply imports all our pipes in one go
import { FixedPipe } from "./fixed-pipe";
import { NanPipe } from "./nan-pipe";
import { CommafyPipe } from "./commafy";
import { PoundifyPipe } from "./poundify";

export const APP_PIPES = [
	FixedPipe,
	NanPipe,
	CommafyPipe,
	PoundifyPipe
];

