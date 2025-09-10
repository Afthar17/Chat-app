export const generateImage = async (prompt) => {
  try {
    const response = await fetch("https://api.freepik.com/v1/ai/mystic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-freepik-api-key": process.env.IMAGE_API_KEY,
      },
      body: JSON.stringify({
        prompt: prompt,
        aspect_ratio: "widescreen_16_9",
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating image:", error);
  }
};

export const checkImageStatus = async (taskId) => {
  try {
    const response = await fetch(
      `https://api.freepik.com/v1/ai/mystic/${taskId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-freepik-api-key": process.env.IMAGE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Freepik API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking image status:", error);
    throw error;
  }
};
