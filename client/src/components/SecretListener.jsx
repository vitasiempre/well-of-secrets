import { useEffect, useState } from "react";
import "./SecretListener.scss";

const SecretListener = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  // Show message once after redirect, then clear
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("submitted")) return;

    setMessage("thank you for your secret");

    // optional: clean the URL so refreshing doesn't show it again
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  useEffect(() => {
    if (!message) return;

    const t = setTimeout(() => setMessage(""), 3000);
    console.log(message, "message");
    return () => clearTimeout(t);
    
  }, [message]);

  const isDisabled = text.trim() === "";

  function autoResize(el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  function onInput(e) {
    const normalized = e.target.value.replace(/\n{2,}/g, "\n");
    setText(normalized);
    autoResize(e.target);
  }

  const submit = async () => {
    if (!text.trim()) return;

    try {
      await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      window.location.href = "/?submitted=1";
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    submit();
  };

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;

    if (!e.shiftKey) {
      e.preventDefault();
      submit();
      return;
    }

    // SHIFT+ENTER: prevent double breaks
    if (e.target.value.endsWith("\n")) e.preventDefault();
  }

  return (
    <>
    <p className={`message ${message ? "is-active" : ""}`}>
            thank you for your secret
        </p>

      <form onSubmit={onSubmitForm}>
        <textarea
          id="secretListener"
          rows="1"
          onKeyDown={handleKeyDown}
          placeholder="Share your secret..."
          name="text"
          value={text}
          onChange={onInput}
          required
        />
        <button type="submit" id="submitButton" disabled={isDisabled}>
          ( Send )
        </button>
      </form>

      
    </>
  );
};

export default SecretListener;