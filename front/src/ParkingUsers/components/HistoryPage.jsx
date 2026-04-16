import style from "../styles/HistoryPage.module.css";
function History() {
  return (
    <div className={style.container}>
      <div className={style.div}>
        <div>
          <div
            style={{ marginBottom: "2,5px", marginTop: "2.5px" }}
            className={style.book}
          >
            <div className={style.info}>
              <div>jan 12 2026</div>
              <div
                style={{
                  textAlign: "end",
                  color: "#22b814",
                  fontWeight: "bold",
                }}
              >
                Open
              </div>
            </div>
            <div
              className={style.info}
              style={{ border: "none", marginTop: "5px" }}
            >
              <div>Parking Area</div>
              <div style={{ textAlign: "end" }}>JIDPark</div>
            </div>
            <div className={style.info} style={{ border: "none" }}>
              <div>Level</div>
              <div style={{ textAlign: "end" }}>6</div>
            </div>
            <div className={style.info} style={{ border: "none" }}>
              <div>Space</div>
              <div style={{ textAlign: "end" }}>Spot A5</div>
            </div>
            <div className={style.info} style={{ border: "none" }}>
              <div>Price</div>
              <div style={{ textAlign: "end" }}>200 birr/hr</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default History;
