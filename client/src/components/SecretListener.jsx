import { useState } from "react";
import "./SecretListener.scss"

const SecretListener = () => {

    const [text , setText] = useState("")

    const onSubmitForm = async (e) => {
        e.preventDefault()
        submit();
    }

    function autoResize(el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    }

    function onInput(e) {
        const normalized = e.target.value.replace(/\n{2,}/g, "\n");
        setText(normalized);
        autoResize(e.target);

    }

    const submit = async (e) => {
    if (!text.trim()) return;
        try {
            const body = {text}
            const res = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            })
            window.location = "/"
        } catch (error) {
            console.error(error.message)
        }
    }

    function handleKeyDown(e) {
  if (e.key === "Enter") {
    // ENTER → submit
    if (!e.shiftKey) {
      e.preventDefault();
      submit();
      return;
    }

    // SHIFT+ENTER → newline, but prevent double breaks
    const value = e.target.value;
    if (value.endsWith("\n")) {
      e.preventDefault();
    }
  }
}

    return <>
    <form action="/submit" method="post" onSubmit={onSubmitForm}>
      <textarea type="text" id="secretListener" rows="1" onKeyDown={handleKeyDown} placeholder="Share your secret..." name="text" value={text} onChange={e => onInput(e)} required></textarea>   
      <button type="submit" id="submitButton"> Send</button>
    </form>
    </>
}

export default SecretListener;