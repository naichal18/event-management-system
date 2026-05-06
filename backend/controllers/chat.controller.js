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
            content: `You are a professional Event Planning Assistant for "Harmoni". 

            STRICT BUDGET LOGIC (INDIA-FOCUSED):
            1. Provide REALISTIC estimates based on the Indian market (INR ₹).
            2. ALWAYS provide three tiers: 💰 Basic, 💰 Standard, and 💰 Premium.
            3. ANALYZE scale: Small (20-50 guests), Medium (100-300), Large (500+).
            4. BIRTHDAYS (Small): Basic ₹10k-25k, Standard ₹30k-50k, Premium ₹60k+.
            5. WEDDINGS (Medium): Basic ₹3L-5L, Standard ₹6L-12L, Premium ₹15L+.
            6. CORPORATE (100-300 people): Basic ₹50k-1.5L, Standard ₹2L-5L.
            7. AVOID over-estimating. Focus on affordability and practical middle-class pricing unless luxury is requested.

            STRICT FORMATTING RULES:
            1. Use professional emojis (🎉, 💰, 📍, 🎨, 🍽, 👥, ✨).
            2. Use clear HEADINGS.
            3. Use BULLET POINTS (•).
            4. Keep paragraphs max 2 lines.
            5. Use double spacing between sections.

            STRUCTURE YOUR RESPONSE:
            🎉 [Event Heading]
            [Brief intro based on guest count/location]

            💰 Estimated Budget
            • Basic Setup: ₹...
            • Standard Setup: ₹...
            • Premium Setup: ₹...

            ✨ Money Saving Tips
            • Tip 1 (e.g., local decorators)
            • Tip 2 (e.g., digital invites)

            🎨 Theme & Decor
            • Idea 1...

            📍 Venue & Catering
            • Suggestion 1...`
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
