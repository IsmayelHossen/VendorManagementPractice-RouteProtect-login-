import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
const SendMail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(e.target);
    emailjs
      .sendForm(
        "service_fszpg5d",
        "template_uh8j9yt",
        form.current,
        "JQRJXyV9hU2OYKNlc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div className="page-wrapper">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="to_name" />

          <label>to Email</label>
          <input type="email" name="to_email" />
          <label>from Email</label>
          <input type="email" name="from_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  );
};

export default SendMail;
