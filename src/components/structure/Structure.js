import File from "../file/File";
import Folder from "../folder/Folder";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Structure = () => {
    const [data, setData] = useState({}); // Сюда будут записываться все данные 
    const [current, setCurrent] = useState(null); // Сюда будет записываться узел который мы нашли по текущему url пути
    
    const location = useLocation();

    useEffect(() => {
        getData();
    }, []);

    // Когда данные записались, и сменился текущий url мы будем обновлять текущий node
    useEffect(() => {
        if (!data) return
        setCurrent(findNode(data, location.pathname))
    }, [data, location.pathname])

    // Получаем и записываем данные с сервера   
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3001/root')

            if (!response) {
                throw new Error('Failed to fetch...')
            }

            const data = await response.json();
            setData(data);

        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    // Функция где мы ищем определенный node по текущему url
    const findNode = (tree, url) => {
        // Разделяем строку типа '/movies/Avengers' на массив ['movies', 'Avengers']
        const segments = url.split('/').filter(item => item !== '');
        let currentNode = tree; // Переменная куда в конце концов будет помещен найденный node

        for (const segment of segments) {
            if (!currentNode) return null;

            if (currentNode.type === 'folder' && currentNode.children) {
                currentNode = currentNode.children[segment] // 
            } else {
                currentNode = currentNode[segment]
            }
        }
        return currentNode;
    }

    const renderCurrent = (node, currentPath) => { // node - текущий узел, currentPath - текущий url адрес
        if (!node) return;

        // КОРНЕВАЯ ПАПКА
        if (!node.type) {
            return Object.entries(node).map(([name, nodeChild]) => (
                <Folder
                    name={name}
                    key={name}
                    path={`/${name}`} // Путь типа /movies, /comics
                />
            ))
        }

        // ФАЙЛ
        if (node.type === 'file') {
            return <File name={node.name}/>
        };

        // ПАПКА
        if (node.type === 'folder' && node.children) {
            return Object.entries(node.children).map(([name, childNode]) => {
                const path = `${currentPath}/${name}`; // Формирование пути (его передаем)

                // Если текущий node файл
                if (childNode.type === 'file') {
                    return <File name={name} key={name}/>
                }

                return (
                    <Folder
                        name={name}
                        key={name}
                        path={path}
                    />
                )
            })
        }
    }

    return (
        <div>
            {/* Будем рендерить только если есть узел. Передаем этот узел и текущий узел */}
            {current && renderCurrent(current, location.pathname)}
        </div>
    )
}   

export default Structure;