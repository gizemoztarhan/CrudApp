import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";


const List = ({ todo, deleteTodo, updateTodo }) => {


    const [isEditing, SetIsEditing] = useState(false)
    // console.log(todo);

    // silme butonuna tıklanınca çalışıcak fonksiyon
    const handleDelete = () => {
        // kullanıcıdan onay iste: vermezse fonksiyonu durdur
        if (!confirm("Silmek istediğinizden emin misiniz?")) return;

        // api todo kaldırma isteği 
        api.delete(`/todos/${todo.id}`)
            .then(() => {
                deleteTodo(todo.id);
                toast.error("Todo kaldırıldı");
            });
    };
    const HandleEdit = (e) => {
        e.preventDefault()

        const updateData = {
            title: e.target[0].value,
            category: e.target[1].value,
            date: new Date().getTime(),
        }
        //  console.log(updateData)


        // title değeri boşsa fonksiyonu durdur ve uyarı ver
        if (!updateData.title.trim()) return toast.warning("İçerik boş olamaz");

        api
            .patch(`/todos/${todo.id}`, updateData)
            .then(() => {
                // state'i güncelle
                updateTodo(todo.id, updateData);
                SetIsEditing(false);
                toast.info("Todo güncellendi");
            });
    }
    // Kategori rengini belirleme fonksiyonu
    const getColor = (category) => {
        const colors = {
            günlük: "#77DD77",
            iş: "#4ecdc4",
            önemli: "crimson",
        };

        // bracket notion
        return colors[category] || "#3f0d54ff";
    };




    if (isEditing) {
        return (
            <div className="list-item">
                <form className="edit-form" onSubmit={HandleEdit}>
                    <div className="edit-inputs">
                        <input defaultValue={todo.title} type="text" placeholder="başlık" />

                        <select defaultValue={todo.category}>
                            <option value="varsayılan">Varsayılan</option>
                            <option value="günlük">Günlük</option>
                            <option value="önemli">Önemli</option>
                            <option value="iş">İş</option>
                        </select>
                    </div>

                    <div className="item-actions">
                        <button>Kaydet</button>
                        <button onClick={() => SetIsEditing(false)}>İptal</button>
                    </div>
                </form>
            </div>
        );

    }
    return (
        <div className="list-item">
            <div className="item-content">
                <h3 className="item-title">{todo.title}</h3>

                <div className="item-details">
                    <span style={{ background: getColor(todo.category) }}
                        className="item-category">{todo.category}</span>
                    <span className="item-date">  {new Date(todo.date).toLocaleDateString("tr", {
                        day: "2-digit",
                        month: "long",
                    })}</span>
                </div>
            </div>


            <div className="item-actions">
                <button className="edit-btn" onClick={() => SetIsEditing(true)}>Düzenle</button>
                <button className="delete-btn" onClick={handleDelete}>Sil</button>
            </div>
        </div>
    )
}

export default List;