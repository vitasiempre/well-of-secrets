import { useRef, useEffect, useState } from "react";
import "./SecretListener.scss";
const API = import.meta.env.VITE_API_URL || "/api";


const SecretListener = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const prevTextRef = useRef("");
  const INVISIBLE_CHARS = /[\u0000-\u001F\u007F\u200B\u200C\u200D\uFEFF\u2060]/;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("submitted")) return;
    setMessage("thank you for your secret");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("submitted")) return;
    setMessage("thank you for your secret");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const isDisabled = text.trim() === "";

  const validate = (text) => {
  if (!text) return "Tell me something";
  const v = text.trim();
  if (!v) return "Tell me something";
  if (INVISIBLE_CHARS.test(v))
    return "This doesn't feel like a secret";
  if (v.length < 5)
    return "This doesn't feel like a secret";
  if (v.length > 2000)
    return "Your secret should be under 2000 characters";
  if (!v.includes(" "))
    return "This doesn't feel like a secret";
  return "";
  };

  function autoResize(el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  function onInput(e) {
    const normalized = e.target.value.replace(/\n{2,}/g, "\n");
    const prev = prevTextRef.current;
    const isErasing = normalized.length < prev.length;
    setText(normalized);
    prevTextRef.current = normalized;
    autoResize(e.target);
    const err = validate(normalized);
    if (err && touched && !isErasing) { 
      setError(err);
    } else {
      setError(null);
    }    
    if (!normalized) setTouched(false);
    console.log(err);
  }

  const submit = async () => {
    const err = validate(text);
    setTouched(true);
    console.log(err);
    
    if (err) { 
      setError(err); 
      console.log(err);
      return; }

    setError("");
    
    try {
      await fetch(`${API}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      window.location.href = "/?submitted=1";
    } catch (error) {
      console.error(error);
      setError(data?.errors?.text?.[0] ?? "something went wrong");
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
        <div className="buttonWrapper">
          <button type="submit" id="submitButton" disabled={isDisabled}>
            ( Send )
          </button>
          <p className={`error ${error ? "is-active" : ""}`}>{error ? error : ""}</p>
        </div>
        
      </form>

      
    </>
  );
};

export default SecretListener;