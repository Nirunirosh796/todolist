import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState,useEffect } from 'react';
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL='http://localhost:3000/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError,setFetchError]=useState(null);
  const [isLoading,setIsLoading]=useState(true)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        console.log(response);  // Log the entire response object
        if (!response.ok) throw Error("Data is not received");
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);
  
 

  const addItem =async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id:id, checked: false, action: item };
    const listItems = [...items, addNewItem];
    setItems(listItems);
    localStorage.setItem("todo_list", JSON.stringify(listItems));

    const postOptions={
      method:'POST',
      headers: {
        'Content-type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }
    const result=await apiRequest(API_URL,postOptions)
    if(result)setFetchError(result)
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.find((item) => item.id === id);

    const updateOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checked: myItem.checked })
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
};


  const handleDelete =async (id) => {
    const listItems = items.filter((item) =>
      item.id !== id
    );
    setItems(listItems);
    const deleteOptions={
      method:'DELETE'
    }
    const reqUrl=`${API_URL}/${id}`;
    const result=await apiRequest(reqUrl,deleteOptions)
    if(result)setFetchError(result);
    
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <div>
      <Header />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content 
            items={items.filter(item => 
              item.action.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer
        length={items.length}
      />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;

