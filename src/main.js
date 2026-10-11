import { youtubePlayerFeature } from "./register.js";

Hooks.once("init", () => youtubePlayerFeature.init());
Hooks.once("ready", () => youtubePlayerFeature.ready());
