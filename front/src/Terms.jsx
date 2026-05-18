import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Shared.css";
export default function TermsPrivacy() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        <MdArrowBack color="red" size={30} />
      </div>
      <h1>Terms & Privacy</h1>

      <section className="card">
        <h2>Terms of Service</h2>
        <p>
          Users must follow booking policies and respect parking rules.
          Administrators commit to maintaining accurate data and fair access.
        </p>
      </section>

      <section className="card">
        <h2>Privacy Policy</h2>
        <p>
          We handle your data securely, with transparency and consent. Your
          information is never sold to third parties and is always protected.
        </p>
      </section>

      <section className="card">
        <h2>User Rights</h2>
        <p>
          You can request access, deletion, or correction of your data at any
          time. Parkify puts you in control of your information.
        </p>
      </section>
      <div className="footer">
        <div className="TermsLogo"></div>
        <div className="moreInfo"></div>
      </div>
    </div>
  );
}
