document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8000/backend/api/api.php';
    const form = document.getElementById('form-category');
    const section = document.getElementById('section-form');
    const table = document.getElementById('table-category');
    const submit = document.getElementById('btn-submit');
    const spinner = document.getElementById('spinner');
    const buttonText = document.getElementById('btn-text');
    const btnAjouter=document.getElementById("btn-show-form")
    const btnAnnuler=document.getElementById("btn-cancel-form")


    btnAjouter.addEventListener("click",()=>section.classList.remove("hidden"))
    btnAnnuler.addEventListener("click",()=>{
        section.classList.add("hidden")
        form.reset()
    })


    function loading(isloding) {
        if (isloding) {
            submit.disabled = true
            buttonText.textContent = "en cours ..."
            spinner.classList.remove("hidden")
        } else{ 
            submit.disabled = false
            buttonText.textContent = "enregistre"
            spinner.classList.add("hidden")
        }
    }

    function toast (message,type="success") {
        const toastcont = document.getElementById("message")
        toastcont.classList.remove("hidden")
        const toast = document.createElement("div")
        const color = type == "success"? 'bg-green-500':'bg-red-500'

        toast.className = `
            ${color} px-5 py-4 text-white transition-opacity duration-500
        `

        toast.textContent = `${message}`
        toastcont.appendChild(toast)
        setTimeout(() => {
            toast.style.opacity = 0
            setTimeout(() => {
                toast.remove()
            }, 500)
        }, 3000)
    }


   

   
   

    function affichercategory(){
        fetch(API_URL).then(res=>
            res.json()
        )
        .then(data=>{
            
            table.innerHTML=""
            data.forEach(category=>{
                const tr=document.createElement("tr")
                tr.innerHTML=`
                    <td class="px-4 py-3">${category["nom"]}</td>
                    <td class="px-4 py-3">${category["desc"]}</td>
                `
                table.appendChild(tr)
            })
        })
        .catch(error=>{
            loading(false)
            console.error(error)
        })
    }

     affichercategory()
    
     form.addEventListener("submit", (e) => {
        e.preventDefault();
        loading(true)
        fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                nom:document.getElementById("nom").value,
                desc:document.getElementById("desc").value
            })
        })
        .then(res => res.json())
        .then(data => {
            form.reset()
            affichercategory()

            setTimeout(() => {
                toast("success")
                loading(false)
            }, 1000);

        })
        .catch(error => {
            
            setTimeout(() => {
                toast("errour :", "error")
                
            }, 1000);
           
            
        })
        
     })

});
