const Fs = require("fs");
const Path = require("path");
const Axios = require("axios");
const { nanoid } = require("nanoid");

const url = "https://thispersondoesnotexist.com/image";

async function downloadImage(amount) {
    for (let i = 0; i < amount; i++) {
        const fileName = nanoid(10) + ".jpg";
        const path = Path.resolve(__dirname, "faces", fileName);
        const writer = Fs.createWriteStream(path);
        const response = await Axios({
            url,
            method: "GET",
            responseType: "stream",
        });
        response.data.pipe(writer);

        new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
        console.log(i, fileName);
    }
}

downloadImage(1);
