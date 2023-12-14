import { useEffect, useState } from "react";
import Power from "./Power";
import axios from "axios";
import "./ControlPanel.css";

interface Prop {
  apiToken: string;
}

const options = {
  method: "GET",
  url: "https://api.lifx.com/v1/lights/all",
  headers: {
    accept: "application/json",
    Authorization: "",
  },
};

function ControlPanel(props: Prop) {
  const [listItems, setListItems] = useState<JSX.Element[] | null>(null);
  options.headers.Authorization = `Bearer ${props.apiToken}`;

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        let res = response.data.filter(
          (item: { [x: string]: boolean }) => item["connected"] === true
        );
        const items = res.map((d: any) => (
          <Power
            key={d.id}
            name={d.label}
            apiToken={props.apiToken}
            id={d.id}
          />
        ));
        setListItems(items);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return <div className="control-panel">{listItems}</div>;
}

export default ControlPanel;
