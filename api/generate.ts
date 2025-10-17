
import { GoogleGenAI, Modality } from "@google/genai";
// @ts-ignore
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { childPhoto, adultPhoto } = req.body;

        if (!childPhoto || !adultPhoto || !childPhoto.mimeType || !childPhoto.data || !adultPhoto.mimeType || !adultPhoto.data) {
            return res.status(400).json({ error: 'Please provide both a child and an adult photo.' });
        }

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("API_KEY environment variable is not set on the server.");
            return res.status(500).json({ error: "Server configuration error. The app owner needs to set an API Key." });
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const generatePrompt = `Create a single, new, hyper-realistic 4K photo based on the two images provided.
        Image 1 is a child. Image 2 is an adult.
        The final image must depict the adult from Image 2 giving a warm, loving, and authentic hug to the child from Image 1.
        Crucially, this should feel like a genuine, emotive moment of connection, as if a person is reuniting with their younger self across time.
        Pay close attention to details like skin texture, lighting, and shadows to ensure maximum realism.
        The original backgrounds must be completely replaced with a seamless, smooth, off-white studio background that is subtly lit with soft, natural light to enhance the emotional tone of the scene.
        The composition should be heartwarming and artistically beautiful.`;

        const childImagePart = { inlineData: { mimeType: childPhoto.mimeType, data: childPhoto.data } };
        const adultImagePart = { inlineData: { mimeType: adultPhoto.mimeType, data: adultPhoto.data } };
        const textPart = { text: generatePrompt };
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [ childImagePart, adultImagePart, textPart ] },
            config: { responseModalities: [Modality.IMAGE] },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
            const imageData = firstPart.inlineData.data;
            return res.status(200).json({ imageData });
        } else {
            console.error("API response was blocked or malformed", JSON.stringify(response, null, 2));
            return res.status(500).json({ error: "The AI did not return a valid image. It may have been blocked for safety reasons." });
        }
    } catch (err: any) {
        console.error("Error in generate function:", err);
        return res.status(500).json({ error: err.message || "An unexpected error occurred on the server." });
    }
}
