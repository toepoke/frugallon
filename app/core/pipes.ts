// simply imports all our pipes in one go
import { FixedPipe } from "./pipes/fixed-pipe";
import { NanPipe } from "./pipes/nan-pipe";
import { CommafyPipe } from "./pipes/commafy";
import { PoundifyPipe } from "./pipes/poundify";

export const APP_PIPES = [
	FixedPipe,
	NanPipe,
	CommafyPipe,
	PoundifyPipe
];

