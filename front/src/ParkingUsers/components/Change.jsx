import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import style from "../../Admin/styles/ChangePassword.module.css";
import { Base_URL } from "../../config";
function Change() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const changePassword = () => {
    if (!oldPassword || !newPassword || !confirm) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirm) {
      toast.error(" password do not match");
      return;
    }
    fetch(
      `${Base_URL}/api/users/changePassword/${oldPassword}/${newPassword}`,
      {
        method: "POST",
        credentials: "include",
      },
    )
      .then((response) => response.text())
      .then((data) => {
        if (data == "Password Changed") {
          toast.success(data);
          navigate("/customer/home");
        } else {
          toast.error(data);
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      });
  };
  return (
    <div className={style.container}>
      <MdArrowBack
        onClick={() => navigate("/customer/home")}
        className={style.back}
        color="red"
      />
      <div className={style.form}>
        <h2>Change Password</h2>
        <div>
          <label>Old Password</label>
          <input onChange={(e) => setOldPassword(e.target.value)} type="text" />
        </div>
        <div>
          <label>new Password</label>
          <input onChange={(e) => setNewPassword(e.target.value)} type="text" />
        </div>
        <div>
          <label>confirm Password</label>
          <input onChange={(e) => setConfirm(e.target.value)} type="text" />
        </div>
        <div>
          <button onClick={() => changePassword()}>Save</button>
        </div>
      </div>
    </div>
  );
}
export default Change;
