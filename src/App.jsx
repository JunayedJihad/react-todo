import React from "react";

const App = () => {
  const [item, setItem] = React.useState({
    value: "",
    updating: false,
  });
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [updateButton, setUpdateButton] = React.useState(false);

  React.useEffect(() => {
    setList(JSON.parse(localStorage.getItem("data")) || []);
  }, []);

  function handleChange(e) {
    setInputValue(e.target.value);
    setItem((prev) => ({
      ...prev,
      value: e.target.value,
    }));
  }

  function add() {
    if (item.value.length) {
      list.push(item);
      setList([...list]);
      localStorage.setItem("data", JSON.stringify(list));
      setInputValue("");
      setUpdateButton(false);
      setItem('')
    } else {
      alert("Write something first!!!");
    }
  }

  function remove(number) {
    list.splice(number, 1);
    setList([...list]);
    localStorage.setItem("data", JSON.stringify(list));
  }

  function edit(number) {
    setUpdateButton(true);
    list[number].updating = true;
    list.map((listItem) => {
      if (listItem.updating) {
        let targetIndex = list.indexOf(listItem);
        setInputValue(list[targetIndex].value);
        remove(targetIndex);
      }
    });
  }

  function reset() {
    list.splice(0, list.length);
    setList([...list]);
    localStorage.clear();
    setInputValue("");
  }

  let listElements = list.map((listItem, index) => (
    <div key={index} className="list-item">
      <span className="index">{index + 1}.</span>
      <span className="list-item-text">{listItem.value}</span>
      <button className="edit-btn" onClick={() => edit(index)}>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
      <button className="delete-btn" onClick={() => remove(index)}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  ));

  return (
    <main>
      <p className="text-center title ">Wanna note something?</p>
      <div className="input-box-container">
        <input
          className="form-control input-box"
          type="text"
          onChange={handleChange}
          value={inputValue}
          placeholder="Add Something..."
        />

        <button className="btn btn-outline-info py-1" onClick={add}>
          {!updateButton ? "Add" : "Update"}
        </button>
      </div>
      <div>{listElements}</div>
      <div className="reset-btn">
        {list.length > 0 && (
          <button className="btn btn-danger py-1" onClick={reset}>
            Delete All
          </button>
        )}
      </div>
    </main>
  );
};

export default App;
