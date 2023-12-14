import { ReactNode, useState } from "react";
import "./Landing.css";
import axios from "axios";

interface Prop {
  handleCallback: (message: string) => ReactNode;
}

function Landing(props: Prop) {
  const [apiKey, setApiKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements as HTMLFormControlsCollection;
    const keyInput = formElements.namedItem(
      "apiKey"
    ) as HTMLInputElement | null;

    if (keyInput) {
      const newApiKey = keyInput.value;
      if (await validKey(newApiKey)) {
        setApiKey(newApiKey);
        props.handleCallback(newApiKey);
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid API Key. Please enter a valid key");
      }
      setApiKey("");
    }
  };

  const validKey = async (apiKey: string) => {
    const lights = {
      method: "GET",
      url: `https://api.lifx.com/v1/lights/all`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    try {
      const res = await axios.request(lights);
      if (res.status !== 200) {
        throw new Error("Invalid API Key. Please enter a valid key!");
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
        return false;
      }
    }
    return true;
  };

  return (
    <div className="landing-flexbox">
      <div className="landing-container">
        <p className="disclaimer">
          Enter your api key at your own risk, while I don't save anything
          (there's no backend) I can't guarantee anything so by using this
          webapp - you are holding yourself accountable for everything that
          happens.
        </p>
        <label>
          <form onSubmit={handleFormSubmit} className="api-input">
            <input
              type="password"
              name="apiKey"
              placeholder="Enter your LIFX API key"
              value={apiKey} // Make sure to bind the value to the state variable
              onChange={(e) => setApiKey(e.target.value)} // Update the state on change
            />
            <button type="submit">Submit API Key</button>
            <p className="errormsg">{errorMessage}</p>
          </form>
        </label>
      </div>
    </div>
  );
}

export default Landing;
