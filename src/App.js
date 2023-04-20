import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import useFetchData from './useFetchData';

//fetch data from API

function APICall(){
  const url = "https://jsonplaceholder.typicode.com/users/1";

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h2>User Data</h2>
      <p><strong>Name: </strong>{userData.name}</p>
      <p><strong>Website: </strong>{userData.website}</p>
      <p><strong>Email: </strong>{userData.email}</p>
      <p><strong>Phone: </strong>{userData.phone}</p>
    </div>
  );
}

//sum of two numbers
function Addition(){
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [total, setTotal] = useState(0);


  function calculateTotal(){
    setTotal(num1 + num2);
  }

  return(
    <div>
      <h2>Adding Two Numbers</h2>
      <input placeholder="Num 1" type="number" value={num1} onChange={(e) => setNum1(+e.target.value)} />
      <input placeholder="Num 2" type="number" value={num2} onChange={(e) => setNum2(+e.target.value)} />
      <button onClick={calculateTotal}>Add the Numbers</button>
      <p>Total: {total || ""}</p> 
    </div>
  );
}




//parent child 
function Child(){
  return (
    <div>This is a child element</div>
  );
}
function Parent({ children}){
  return (
    <div>
      <h3>Parent Component</h3>
      { children }
    </div>
  );
}

function App() {

// const [name, setName] = useState("John");
// const changeName = () => {
//   setName("John Allen");

// };


// show hide element 
const [show, setShow] = useState(true);

//render user list array
const persons = [
              {name: "John", id: 1},
              { name: "Jane", id: 2}, 
              {name: "Billy", id: 3}
];

const personItems = persons.map((person) => <li key={person.id}>{person.name}</li>);

const [name, setName] = useState("");

const [count, setCount] = useState(0);

useEffect(() => {
  console.log(`You have liked the post ${count} times`)
}, [count]);

const [count2, setCount2] = useState(0);

useEffect(() => {
  console.log(`You have liked the status ${count2} times`)
}, [count2]);

const { data } = useFetchData("https://api.github.com/users");


  return (



    
    <div className="App">
    <APICall></APICall>
    <Addition></Addition>

    <Parent>
      <Child></Child>
    </Parent>

    <button onClick={() => setShow(!show)}>{show ? "Hide element below" : "Show Element Below"}</button>
    { show && <div>Toggle Div</div>}

      <h3>Person Names</h3>
      <ul>{personItems}</ul>
      <form>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="your name"/>
      </form>
      <p>My name is {name}</p>
      {/* <button onClick={changeName}>Click me</button> */}
    
    
      <button onClick={() => setCount(count + 1)}>Like this post</button>
      <div><p>This post has been liked {count} times.</p></div>
      <button onClick={() => setCount2(count2 + 1)}>Like this status</button>
      <div>This status has been liked {count2} times.</div> 

    
      <div>
          {data && (
            data.map((user) =>(
                <div className="text-white" key={user.id}>
                    <h1> {user.login} </h1>
                    <p> { user.type } </p>
                </div>
            ))
          )}
      </div>
    
    
    </div>
  );
}

export default App;
