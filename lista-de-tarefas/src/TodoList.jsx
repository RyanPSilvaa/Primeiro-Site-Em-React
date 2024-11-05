import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icon from "../imagens/image001.png";

function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoitem] = useState("");

    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista));
    }, [lista])

    function adicionaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoitem("");

        document.getElementById("input-entrada").focus();
    }

    function clicou(index) {  // Adicionado 'index' como parâmetro
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletar(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletarTudo(){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e) => setNovoitem(e.target.value)}
                    placeholder="Adicione uma tarefa"
                />
                <button className="btn" type="submit">Add</button>
            </form>
            <div className="lista-tarefas">
                <div style={{ alignItems: 'center' }}>
                    {
                        lista.length < 1
                            ? <img src={Icon} alt="Nenhuma tarefa" />
                            : lista.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.isCompleted ? "item-completo" : "item"}
                                >
                                    <span onClick={() => clicou(index)}>{item.text}</span> {/* Passando index para clicou */}
                                    <button onClick={() => deletar(index)} className="btn-deletar"> Deletar</button>

                                </div>
                            ))
                    }

                    {
                        lista.length > 0
                        &&
                        <button onClick={() => deletarTudo()} className="deleteAll"> Deletar Todas</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default TodoList;
