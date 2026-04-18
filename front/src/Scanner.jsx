import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdClose, MdDone } from "react-icons/md";
import { Base_URL } from "./config";
import style from "./Scanner.module.css";
import FailMp from "./Sounds/fail.mp3";
import SuccessMp from "./Sounds/success.mp3";
function Scanner() {
  const [result, setResult] = useState("");
  const readerRef = useRef(null);
  const containerRef = useRef(null);
  const [success, setSuccess] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState("");
  const successSound = new Audio(SuccessMp);
  const failSound = new Audio(FailMp);

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
              setResult(decodedText);
              const parts = decodedText.split(":");
              const id = parts[1];
              await reader.stop();
              verifyBooking(id);
            },
          );
        }
      } catch (err) {
        toast.error("Please Wait  !");
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
      const data = await response.text();
      if (data == "Booking Confirmed") {
        setSuccess(true);
        successSound.play();
      } else {
        setSuccess(false);
        failSound.play();
      }
      setMessage(data);
      setScanned(true);
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
      <div className={style.container}>
        <div style={{ justifyItems: "center" }}>
          <h1>QR Scanner</h1>
          <div id="reader" className={style.reader} ref={containerRef}></div>
        </div>
        {scanned && (
          <div className={style.confirmation}>
            {success ? (
              <>
                <MdDone color="green" size={300} />
                <p>{message}</p>
              </>
            ) : (
              <>
                <MdClose color="red" size={300} />
                <p>{message}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Scanner;
