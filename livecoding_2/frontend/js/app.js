document.addEventListener("DOMContentLoaded", () => {

    const api = '../../backend/api.php';
    const formcat = document.getElementById("form_cat");
    const tabelcat = document.getElementById("tabel_cat");
    const nom = document.getElementById("nom");
    const desc = document.getElementById("desc");


    function affich() {
        fetch(api)
        .then(res => res.json())
        .then(category => {
            tabelcat.innerHTML = "";

            category.forEach(cat => {
                tabelcat.insertAdjacentHTML("beforeend", `
                        <tr>
                            <td>${cat.id}</td>
                            <td>${cat.nom}</td>
                            <td>${cat.desc}</td>
                        </tr>
                    `);
            })
        })
        .catch(error => {
            console.error(error);
            
        })
    }


    



    formcat.addEventListener('submit', (event) => {
        event.preventDefault();

        fetch(api, {
            method: "POST", 
            headers: {"Conetent-Type": "application/json"},
            body: JSON.stringify({

                nom:nom.value,
                desc:desc.value
            })

            
        })
        .then(res => res.json())
        .then(data => {
            formcat.reset()
            affich();
        })
        .catch(error => {
            console.error(error);
            
        })

        console.log(data);
        


    })

    affich();
});