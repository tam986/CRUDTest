import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const response = await fetch("http://ip-api.com/json");
    const result = await response.json();
    if (result) {
      console.log("lay duoc roi");
      setData(result);
    } else {
      console.error("looi kia:");
    }
    referrerPolicy: "unsafe-url";
  };
  return (
    <div>
      <button onClick={handleClick}>get</button>
      {data && (
        <div>
          <h2>API</h2>
          <ul>{JSON.stringify(data)}</ul>
        </div>
      )}
    </div>
  );
}

export default App;
