import React, { useState } from 'react'

function Navbar() {
    // Gen Stuff
    const fileGen = document.getElementById('file-gen');

    const [fileText, setFileText] = useState("")
    const exportHandler = () => {
        function saveFile(Text_To_Save) {
            const link = "data:application/x-whatever;base64," + window.btoa(Text_To_Save); 
            setFileText(link);
            click(fileGen);
        }
        function click(node) {
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, null, 0, 0, 0, 0, 0,
                                false, false, false, false, 0, null);
            return node.dispatchEvent(event);
        }
        saveFile(localStorage.todos)
    }
    const importHandler = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();

        fileInput.addEventListener('change', () => {
            const files = document.getElementById('fileInput').files;
            console.log(files);
            if (files.length <= 0) return false;

            const fr = new FileReader();

            fr.onload = (e) => {
                console.table(e.target);
                localStorage.todos = e.target.result;
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

            fr.readAsText(files.item(0));
        });
    }
    return (
        <div>
            <ul className="navbar">
                <button className="navbar-item export" onClick={exportHandler}>Export</button>
                <button className="navbar-item import" onClick={importHandler}>Import</button>
            </ul>
            <a href={fileText} id="file-gen" className="hidden" download="todos_backup.json"></a>
            <input type="file" id="fileInput" className="hidden"/>
        </div>
    )
}

export default Navbar
