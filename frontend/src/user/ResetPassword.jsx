import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * Depending on the presents of the necessary
 * query parameter `localhost:3000/passwordReset?token=...&id=...`
 * renders RequestReset which lets you start
 * the reset process -> make the server send a mail
 * or submit new password with token to change password aka confirm
 */
export default function ResetPassword() {
  const [query] = useSearchParams();

  const id = query.get("id");
  const token = query.get("token");

  const isRequestStep = !token && !id;

  return isRequestStep ? (
    <RequestReset />
  ) : (
    <ConfirmReset id={id} token={token} />
  );
}

/**
 * Component to start a reset Process
 */
function RequestReset() {
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post("/api/user/resetPassword", {
        email: e.currentTarget.elements.email.value,
      });
      setConfirmed(true);
    } catch (e) {
      console.log("/resetPassword failed", e);
      setError("Something went wrong!");
    }
  };

  return confirmed ? (
    <p>An Email with a Password reset link has been send.Check your inbox.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Your email address" />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Send Reset Mail</button>
    </form>
  );
}

/**
 * Confirm your new password
 */
function ConfirmReset({ id, token }) {
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post("/api/user/resetPassword-confirm", {
        password: e.currentTarget.elements.password.value,
        id,
        token,
      });
      nav("/login");
    } catch (e) {
      console.log("/resetPassword failed", e);
      setError("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="password" type="password" placeholder="your password" />
      <input
        name="password-confirm"
        type="password"
        placeholder="your password"
      />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Confirm new Password</button>
    </form>
  );
}
