import { useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const url = "https://fandbsoft.com/global/api/employee-info";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ listEmployeeID: [1, 2, 3] }),
    });
    if (response) {
      const result = await response.json();
      console.log("lấy được rồi:", result);
      setData(result);
    } else {
      console.error("Lỗi rồi");
    }
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
