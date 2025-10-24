import { useEffect, useState } from "react";
import api from "./utils/api";
import List from "./components/list";
import Form from "./components/Form";

const App = () => {
  // api'ndan gelen todo verisi
  const [todos, setTodos] = useState([]);

  //aranan kelime
  const [searchTerm, setSearchTerm] = useState("");

  //filtreleme sonucu geriye kalan todolar
  const [filtredTodos, setFiltredTodos] = useState([]);


  //yeni todo verisini state ekle
  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos])

  }


  const deleteTodo = (delete_id) => {
    // parametre olarak gelen id'li todoyu diziden kaldır
    const filtred = todos.filter((todo) => todo.id !== delete_id);

    // state'i güncelle
    setTodos(filtred);
  };


  const updateTodo = (id, updateData) => {
    // ttodos verisinin kopyasını al
    const temp = [...todos];

    // güncellenicek elemanın idsi üzerinden dizideki sırasını bul
    const index = temp.findIndex((todo) => todo.id === id);

    // sırasını bildiğimiz elemanı güncelle
    temp.splice(index, 1, { id, ...updateData });

    // state'i güncelle
    setTodos(temp);
  }


  useEffect(() => {
    api.get("/todos?_sort=date&_order=desc")
      .then((res) => {
        setTodos(res.data);
        setFiltredTodos(res.data);
      });
  }, []);

  // console.log(todos);


  useEffect(() => {

    const filtred = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFiltredTodos(filtred);
  }, [searchTerm, todos]);

  return (
    <div className="app-container">
      <header>
        <h1>TODO</h1>
        <p>Pratik için basit todo uygulaması</p>
      </header>


      <Form addTodo={addTodo} />

      {/* Arama Kutusu */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Öğe ara....    (başlık veya kategori)"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

        {searchTerm && <button onClick={() => setSearchTerm("")}>Temizle</button>}
      </div>

      {/* Öğe Sayısı */}
      <div className="items-info">
        <p>
          Toplam {todos.length} todo içerisinden,{" "}
          {searchTerm ? `${filtredTodos.length} ${searchTerm} sonucu var` : `${filtredTodos.length} gösteriliyor`}
        </p>
      </div>

      <div className="items-list">
        {filtredTodos.length === 0 ? (
          <p className="no-items">{searchTerm ? "Arama sonucu bulunamadı" : "Henüz todo eklenmedi"}</p>
        ) : (
          filtredTodos.map((todo) => (
            <List key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          ))
        )}
      </div>




    </div>
  )
}

export default App;