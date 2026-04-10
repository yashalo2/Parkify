import style from "../styles/AdminPage.module.css";
function AdminPage() {
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.chart}></div>
        <div className={style.more}>
          <div className={style.moreTop}></div>
          <div className={style.moreBottom}></div>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.left}>
          <div className={style.upper}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.lower}></div>
          <div className={style.rightMore}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
