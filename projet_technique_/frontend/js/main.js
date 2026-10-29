document.addEventListener('DOMContentLoaded', () => {


    const API_URL = "http://localhost:8000/backend/api/controllers/controllerThematique.php";

    const tabele = document.getElementById("table_category");


    const form = document.getElementById("form_category");

    const btnajoute = document.getElementById("btn_addcategory");

    const btnannuler = document.getElementById("btn_annuler");

    const sectionform = document.getElementById("section_form");

    const nomcategory = document.getElementById("nom_category");

    const description = document.getElementById("description");



    btnajoute.addEventListener("click", () => {
        sectionform.classList.remove("hidden")
    });

    btnannuler.addEventListener("click", () => {
        sectionform.classList.add("hidden")
        form.reset()
    });



    function afficherCategory() {

        fetch(API_URL)
            .then(response => response.json())
            .then(thematiques => {
                tbody.innerHTML = ""
                thematiques.forEach(thematique => {
                    tbody.innerHTML += `
                <tr>
                <td class="p-4 text-sm font-semibold text-gray-500">${thematique.name}</td>
                <td class="p-4 text-sm font-semibold text-gray-500 ">${thematique.description}</td>
                </tr>
                `

                });
            })



    }

    function showToast(message,type="success"){
        const container=document.getElementById("toast-container")
        const toast=document.createElement("div");
        toast.className="text-white px-4 py-3 rounded shadow "
        if(type=="success"){
            toast.className += "bg-green-500"
        }else{
            toast.className += "bg-red-500"
        }
        toast.textContent=message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }


    
form.addEventListener("submit",function(e){
        e.preventDefault()
        const data={
            name:nameF.value,
            description:descriptionF.value
        }
        spinner.classList.remove("hidden")
            btnText.textContent="enregistrer......"
            btnSubmit.disabled=true;

        fetch(API_URL,
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            }
        )
        .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.error);
            }
            return data;
        });
    })
        .then(() => {
            showToast("Added successfully", "success");
            form.reset();
            showThematique();
        })
        .catch(error => {
            showToast(error.message, "error");
        })
        .finally(() => {
            spinner.classList.add("hidden");
            btnText.textContent = "Enregistrer";
            btnSubmit.disabled = false;
        });
})







});

