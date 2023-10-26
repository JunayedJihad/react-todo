import React from 'react';

const App = () => {

  const[list,setList] =React.useState([])
  const [item, setItem] = React.useState("")
  // const[input,setInput] = React.useState("")

  React.useEffect(() => {
    setList(JSON.parse(localStorage.getItem('data'))||[])

  },[])


  function handleChange(e) {
    // setItem(input);
    setItem(e.target.value)
    // setInput(e.target.value)

  }

  function add() {
    if (item.length) {
      list.push(item)
      setList([...list]);
      localStorage.setItem("data", JSON.stringify(list));
    } else {
      console.log('no text provided')
    }
    // setItem('')
    // setInput('')
    // console.log(input);
  }


  function remove(number) {
    list.splice(number, 1)
    setList([...list])
    localStorage.setItem("data", JSON.stringify(list));
  }

  function edit(number) {

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
      <input type="text" onChange={handleChange} id="" placeholder='Add Something...'  />
      <button onClick={add}>Add</button>
      <div>{listElements}</div>
    </div>
  );
};

export default App;