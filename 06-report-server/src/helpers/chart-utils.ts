import axios from "axios";

export const chartJsToImage = async (chartConfig: unknown) => {
    const encodedUri = encodeURIComponent(JSON.stringify(chartConfig));
    const chartUrl = `https://quickchart.io/chart?c=${encodedUri}`;
    const response = await axios.get(chartUrl, { responseType: "arraybuffer" });
    return `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;
}