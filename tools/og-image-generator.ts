import {
	createCanvas,
	loadImage,
} from "https://deno.land/x/canvas@v1.4.2/mod.ts";

const width = 1200;
const height = 630;
const fontSize = 65;
const title = Deno.args[0];
const imagePath = Deno.args[1] || "./kbaba1001-bg.png";
const wrapLength = Deno.args[2] || 20;
const outputPath = Deno.args[3] || "output.png";

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
const backgroundImage = await loadImage(imagePath);

ctx.drawImage(backgroundImage, 0, 0);

const font_buffer = await Deno.readFile("./tools/VL-Gothic-Regular.ttf");
canvas.loadFont(font_buffer, { family: "VL-Gothic" });
ctx.font = `bold ${fontSize}px VL-Gothic`;
ctx.fillStyle = "#000000";

const titles: string[] = [];
if (title.length <= wrapLength) {
	titles.push(title);
} else {
	titles.push(title.slice(0, wrapLength));
	let secondLine = title.slice(wrapLength, wrapLength * 2 - 1);
	if (title.slice(wrapLength * 2).length > 0) {
		secondLine += "…";
	}
	titles.push(secondLine);
}
const startX = 50;
const startY = 130;
titles.forEach((t, i) => {
	ctx.fillText(t, startX, startY + i * fontSize);
});

await Deno.writeFile(outputPath, canvas.toBuffer());
