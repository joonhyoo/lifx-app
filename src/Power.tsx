import { useEffect, useState } from "react";
import "./Power.css";
import axios from "axios";

interface Prop {
  name: string;
  apiToken: string;
  id: string;
}

function Power(props: Prop) {
  const [light, setLight] = useState<boolean | null>(null);
  const lightState = {
    method: "GET",
    url: `https://api.lifx.com/v1/lights/${props.id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${props.apiToken}`,
    },
  };
  const flipLight = {
    method: "PUT",
    url: `https://api.lifx.com/v1/lights/${props.id}/state`,
    headers: {
      accept: "text/plain",
      "content-type": "application/json",
      Authorization: `Bearer ${props.apiToken}`,
    },
    data: {
      duration: 0.2,
      fast: false,
      power: "off",
      color: "kelvin:2700",
      brightness: 1,
    },
  };

  useEffect(() => {
    axios.request(lightState).then((res) => {
      const light = res.data[0].power;
      console.log(res.data);
      if (light === null) {
        setLight(null);
      } else {
        setLight(light !== "on");
      }
    });
  }, []);

  function handleClick() {
    setLight(!light);
    flipLight.data.power = "off";
    if (light) {
      flipLight.data.power = "on";
    }
    axios
      .request(flipLight)
      .then(function (response) {
        console.log(response.data);
        console.log(flipLight.url);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="switch-container">
      <h2 className="light-name">{props.name}</h2>
      <button onClick={handleClick} className="switch">
        {light === null
          ? "Loading..."
          : light
          ? "Turn Light On"
          : "Turn Light Off"}{" "}
      </button>
    </div>
  );
}

export default Power;
