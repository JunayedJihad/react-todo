import React from "react";

const App = () => {
  const [item, setItem] = React.useState();
  const [list, setList] = React.useState([]);
  const [value, setValue] = React.useState("");
  const[isUpdated, setIsUpdated] = React.useState(false)

  React.useEffect(() => {
    setList(JSON.parse(localStorage.getItem("data")) || []);
  }, []);

  function handleChange(e) {
    const item =e.target.value;
    setValue(item)
    console.log(value);
    setItem(value);
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
    setIsUpdated(false);
  }

  let listElements = list.map((listItem, index) => (
    <div key={index} className="list-item">
      <span className="list-item-text">{listItem}</span>
      <button className="edit-btn" onClick={() => edit(index)}>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <button
        className="delete-btn"
        onClick={() => remove(index)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  ));

  return (
    <main>
      <p className="text-center title ">What's Your Plan?</p>
      <div className="input-box-container">

        <input
          className="form-control input-box"
          type="text"
          onChange={handleChange}
          id=""
          placeholder="Add Something..."
        />
        <button className="btn btn-outline-info py-1" onClick={add}>{isUpdated?"Update":"Add"}</button>
      </div>
      <div>{listElements}</div>
      <div className="reset-btn">
        {list.length>0 && <button className="btn btn-danger py-1" onClick={reset}>Delete All</button>}

      </div>
    </main>
  );
};

export default App;
