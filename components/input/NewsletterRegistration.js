import classes from "./newsletter-registration.module.css";
import { useRef } from "react";

function NewsletterRegistration() {
  const emailToRegisterRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    console.log(emailToRegisterRef.current.value);
    fetch("/api/newsletterRegistration", {
      method: "POST",
      body: JSON.stringify({ email: emailToRegisterRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailToRegisterRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
