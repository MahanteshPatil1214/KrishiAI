export async function translateText(text, targetLang = "en") {
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
        format: "text",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}
