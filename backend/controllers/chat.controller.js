// Using native fetch (available in Node.js 18+) to avoid external dependencies
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5001", // Optional, for OpenRouter analytics
        "X-Title": "Harmoni Event Management" // Optional
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant for an Event Management website called Harmoni. Help users create events, suggest themes, budget ideas, and guide them through the platform. Be polite and professional."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API Error:", errorText);
      throw new Error(`OpenRouter Error: ${response.status}`);
    }

    const data = await response.json();
    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("OpenRouter Error:", error.message);
    res.status(500).json({ reply: "AI error occurred. Switching to fallback mode." });
  }
};

module.exports = { chatWithAI };
