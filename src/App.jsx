import React from "react";

const App = () => {
  const [list, setList] = React.useState([]);
  const [item, setItem] = React.useState("");
  const [value, setValue] = React.useState("");
  const[isUpdated, setIsUpdated] = React.useState(false)

  React.useEffect(() => {
    setList(JSON.parse(localStorage.getItem("data")) || []);
  }, []);

  function handleChange(e) {
    setItem(e.target.value);
  }

  function add() {
    if (!isUpdated) {

      if (item.length) {
        list.push(item);
        setList([...list]);
        localStorage.setItem("data", JSON.stringify(list));
      } else {
        console.log("no text provided");
      }

    } else {
      if (item.length) {

      } else {
        console.log("no text provided");

      }
    }
  }

  function remove(number) {
    list.splice(number, 1);
    setList([...list]);
    localStorage.setItem("data", JSON.stringify(list));
  }

  function edit(number) {
    setIsUpdated(true);
  }

  function reset() {
    list.splice(0, list.length);
    setList([...list]);
    localStorage.clear()
  }

  let listElements = list.map((listItem, index) => (
    <div key={index}>
      <span>{listItem}</span>
      <button onClick={() => edit(index)}>Edit</button>
      <button onClick={() => remove(index)}>Remove</button>
    </div>
  ));

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        id=""
        placeholder="Add Something..."
      />
      <button onClick={add}>{isUpdated?"Update":"Add"}</button>
      <div>{listElements}</div>
      {list.length>0 && <button onClick={reset}>Delete All</button>}
    </div>
  );
};

export default App;
