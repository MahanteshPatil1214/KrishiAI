import { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function TranslatorText({ text }) {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (!language || language === "en") {
        setTranslated(text);
        return;
      }

      try {
        const res = await axios.get("https://api.mymemory.translated.net/get", {
          params: {
            q: text,
            langpair: `en|${language}`,
          },
        });

        if (res.data?.responseData?.translatedText) {
          setTranslated(res.data.responseData.translatedText);
        } else {
          setTranslated(text);
        }
      } catch (error) {
        console.error("Translation error:", error);
        setTranslated(text);
      }
    };

    fetchTranslation();
  }, [text, language]);

  return <span className="font-medium text-green-800">{translated}</span>;
}
