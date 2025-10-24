import api from "../utils/api";
import { toast } from "react-toastify";



const Form = ({ addTodo }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTodo = {
            title: e.target[0].value,
            category: e.target[1].value,
            date: new Date().getTime(),
        };


        // title kontrol 
        if (!newTodo.title.trim()) return toast.warning("İçerik boş olamaz");

        // yeni veriyi kaydet
        api.post("/todos", newTodo).then((res) => {
            addTodo(res.data);
            e.target.reset();
            toast.success("Yeni TODO oluşturuldu");
        })
    }



    return (

        <form onSubmit={handleSubmit} className="form-container">
            <h2>Yeni Öğe Ekle</h2>

            <div className="form-group">
                <label htmlFor="title">Başlık:</label>
                <input id="title" type="text" />
            </div>

            <div className="form-group">
                <label htmlFor="category">Kategori:</label>
                <select id="category">
                    <option value="varsayılan">Varsayılan</option>
                    <option value="günlük">Günlük</option>
                    <option value="önemli">Önemli</option>
                    <option value="iş">iş</option>
                </select>
            </div>

            <button>Ekle</button>
        </form>
    )
}


export default Form;