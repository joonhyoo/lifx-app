import { useState } from "react";
import Landing from "./Landing";
import ControlPanel from "./ControlPanel";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState("");

  function Callback(apiKey: string) {
    setApiKey(apiKey);
    return apiKey;
  }

  return (
    <div>
      {apiKey.length === 0 ? (
        <Landing handleCallback={Callback} />
      ) : (
        <ControlPanel apiToken={apiKey} />
      )}
    </div>
  );
}

export default App;
