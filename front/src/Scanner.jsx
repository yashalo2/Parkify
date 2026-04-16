import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { Base_URL } from "./config";

function Scanner() {
  const [result, setResult] = useState("");
  const readerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const initScanner = async () => {
      if (!containerRef.current) return;
      const reader = new Html5Qrcode(containerRef.current.id);
      readerRef.current = reader;

      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          await reader.start(
            cameraId,
            { fps: 10, qrbox: 250 },
            async (decodedText) => {
              console.log("Scanner Booking", decodedText);
              setResult(decodedText);
              const parts = decodedText.split(":");
              const id = parts[1];
              await reader.stop();
              verifyBooking(id);
            },
            (err) => console.warn("Scan error", err),
          );
        }
      } catch (err) {
        console.error("Scanner error:", err);
      }
    };

    const timer = setTimeout(initScanner, 300);

    return () => {
      clearTimeout(timer);
      if (readerRef.current) {
        readerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const verifyBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `${Base_URL}/api/booking/EntranceScanner/${bookingId}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <h1>QR Scanner</h1>
      <div
        id="reader"
        ref={containerRef}
        style={{ width: "300px", height: "300px" }}
      ></div>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default Scanner;
