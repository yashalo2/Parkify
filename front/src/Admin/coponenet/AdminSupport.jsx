import { useRef } from "react";
import { MdBlock, MdFilterAlt, MdPerson, MdSend } from "react-icons/md";
import style from "../styles/AdminSupport.module.css";
function AdminSupportPage() {
  const textRef = useRef(null);
  const handleInput = (e) => {
    const el = textRef.current;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px"; // cap at 200px
  };
  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <div
          style={{
            width: "100%",
            height: "50px",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <h3>Support Center</h3>
        </div>
        <div className={style.filter}>
          <input type="text" />
          <button>
            <MdFilterAlt size={25} />
          </button>
        </div>
        <div className={style.users}>
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>{" "}
          <div className={style.user}>
            <div className={style.profile}>
              <div className={style.img}>
                <MdPerson size={50} />
              </div>
            </div>
            <div className={style.info}>
              <div> first Name last Name</div>
              <div> Email</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.messageContainer}>
        <div className={style.header}>
          <div className={style.receiver}>
            <div className={style.div}>
              <MdPerson size={25} />
            </div>
            <div className={style.name}>Receiver Full Name</div>
          </div>
          <div className={style.action}>
            <button>
              <MdBlock />
            </button>
          </div>
        </div>
        <div className={style.body}></div>
        <div className={style.input}>
          <div className={style.textarea}>
            <textarea
              ref={textRef}
              onChange={handleInput}
              type="text"
              placeholder="type message here ..."
            />
            <div className={style.button}>
              <button>
                <MdSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminSupportPage;
