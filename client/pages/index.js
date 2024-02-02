import Image from "next/image";
import { Ewert, Inter } from "next/font/google";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
const inter = Inter({ subsets: ["latin"] });
import { Playfair_Display } from "next/font/google";
const font = Playfair_Display({
  subsets: ["latin"],
});
import Table from "react-bootstrap/Table";

export default function Home() {
  const [result, setResult] = useState(false);

  const [response, setResponse] = useState();

  const [input, setInput] = useState(
    "I dogs are amazing. Cats must be the easiest pets around. Robots are advanced now with AI. Flying in space can only be done by Artificial intelligence."
  );
  const [category, setCategory] = useState("");
  const [probability, setProbability] = useState();

  const handlePostRequest = async () => {
    try {
      setResult(false);
      // Göndermek istediğiniz JSON verisini hazırlayın
      const dataToSend = {
        message: input,
      };

      // POST isteği yapma
      const response = await fetch("http://127.0.0.1:8000/post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // JSON'a dönüştürme
      });

      // Yanıtın başarılı olup olmadığını kontrol etme
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Yanıtı JSON olarak çözme
      const responseData = await response.json();

      // Yanıtı ekranda gösterme (Bu fonksiyonun tanımlı olduğundan emin olun)
      console.log(responseData);
      setResponse(responseData);
      setResult(true);
    } catch (error) {
      console.error("POST isteği sırasında hata oluştu:", error);
    }
  };
  return (
    <main
      className={` ${inter.className}`}
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      <div
        className={font.className}
        style={{
          backgroundColor: "black",
          width: "100%",
          padding: "15px 0",
          fontWeight: 400,
          fontSize: 32,
          textAlign: "center",
          color: "white",
          position: "fixed",
          top: 0,
          left: 0,
          borderBottom: "1px solid gray",
        }}
      >
        semantic-split
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "2",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div
          class={`grid ${
            result ? "lg:grid-cols-2" : "lg:grid-cols-1"
          }  sm:grid-cols-2  md:grid-cols-2 gap-4 text-white container `}
        >
          <div
            className="lg:col-span-1 md:col-span-2 sm:col-span-2"
            style={{
              width: "100%",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 10,

              padding: 20,
              border: "1px solid #333",
            }}
          >
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div class=" w-full">
                <label for="text" class="text-xl font-semibold mb-2">
                  Ayırma İşlemi
                </label>
                <textarea
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  id="text"
                  class="w-full p-3 text-base text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="8"
                  placeholder="Örnek Haber"
                  required
                  value={input}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "1px solid #333",
                  }}
                />
              </div>

              <button
                type="button"
                style={{ border: "1px solid #333" }}
                class="bg-[#0a0a0a] text-white font-bold py-3 px-4 rounded hover:bg-gray-700"
                onClick={() => {
                  handlePostRequest();
                }}
              >
                Ayır
              </button>
            </form>
          </div>
          <div>
            {response?.message != undefined &&
              response.message.map((innerArray, index) => (
                <div key={index} className="bg-white text-black px-2">
                  {innerArray.map((item, innerIndex) => (
                    <p key={innerIndex}>{item}</p>
                  ))}
                </div>
              ))}{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
