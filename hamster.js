document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("hamsterCanvas");
    const ctx = canvas.getContext("2d");

    // Define colors
    const colors = {
        brown: "#8B4513",
        darkBrown: "#5C3317",
        white: "#FFFFFF",
        pink: "#FFC0CB",
        black: "#000000"
    };

    // Simple pixel data for a hamster face
    const pixels = [
        [null, null, colors.darkBrown, colors.darkBrown, colors.darkBrown, colors.darkBrown, null, null],
        [null, colors.brown, colors.brown, colors.white, colors.white, colors.brown, colors.brown, null],
        [colors.brown, colors.brown, colors.white, colors.black, colors.black, colors.white, colors.brown, colors.brown],
        [colors.brown, colors.white, colors.white, colors.white, colors.white, colors.white, colors.white, colors.brown],
        [colors.brown, colors.white, colors.pink, colors.white, colors.white, colors.pink, colors.white, colors.brown],
        [null, colors.brown, colors.white, colors.white, colors.white, colors.white, colors.brown, null],
        [null, null, colors.darkBrown, colors.brown, colors.brown, colors.darkBrown, null, null]
    ];

    // Draw each pixel
    const pixelSize = 4;
    pixels.forEach((row, y) => {
        row.forEach((color, x) => {
            if (color) {
                ctx.fillStyle = color;
                ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        });
    });
});
