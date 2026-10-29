document.addEventListener('DOMContentLoaded', () => {


    const API_URL = "http://localhost:8000/backend/api/controllers/ControllerThematique.php";

    const tabele = document.getElementById("table_category");


    const form = document.getElementById("form_category");

    const btnajoute = document.getElementById("btn_addcategory");

    const btnannuler = document.getElementById("btn_annuler");

    const sectionform = document.getElementById("section_form");

    const nom = document.getElementById("nom");

    const desc = document.getElementById("desc");

    const spinner = document.getElementById("spinner");
    const btnText = document.getElementById("btn_text");
    const btnSubmit = document.getElementById("btn_submit");


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
                tabele.innerHTML = "";
                thematiques.forEach(thematique => {
                    tabele.innerHTML += `
                <tr>
                <td class="p-4 text-sm font-semibold text-gray-500">${thematique.nom}</td>
                <td class="p-4 text-sm font-semibold text-gray-500 ">${thematique.desc}</td>
                <td class="p-4 text-sm text-right">
                    <a href="#" class="text-blue-600 hover:text-blue-800 mr-3">
                        Edit
                    </a>
                    <a href="#" class="text-red-600 hover:text-red-800">
                        Remove
                    </a>
                </td>
                </tr>
                `

                });
            })



    }

    function showToast(message, type = "success") {
        const container = document.getElementById("toast_con")
        const toast = document.createElement("div");
        toast.className = "text-white px-4 py-3 rounded shadow "
        if (type == "success") {
            toast.className += "bg-green-500"
        } else {
            toast.className += "bg-red-500"
        }
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }



    form.addEventListener("submit", function (e) {

        let toastMessage;
        let toastType;
        e.preventDefault()
        const data = {
            nom: nom.value,
            desc: desc.value
        }
        spinner.classList.remove("hidden")
        btnText.textContent = "enregistrer......"
        btnSubmit.disabled = true;

        fetch(API_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
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
                toastMessage = "Added successfully";
                toastType = "success";
                form.reset();
                afficherCategory();
            })
            .catch(error => {
                toastMessage = error.message;
                toastType = "error";
            })
            .finally(() => {
                setTimeout(() => {
                    showToast(toastMessage, toastType);

                    spinner.classList.add("hidden");
                    btnText.textContent = "Enregistrer";
                    btnSubmit.disabled = false;
                }, 1000);
            });
    })




    afficherCategory();


});

