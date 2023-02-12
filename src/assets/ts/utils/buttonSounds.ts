import { Howl } from "howler";
import buttonClick from "@/assets/sounds/button_click.mp3";

// use buttonClickSound.play() to work
const buttonClickSound = new Howl({
  src: [buttonClick],
});

export default { buttonClickSound };
