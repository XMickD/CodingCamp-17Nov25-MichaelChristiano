(function(){
    const $ = (sel, ctx=document) => ctx.querySelector(sel);

    function loadGreeting(){
        const greetingEl = document.getElementById('greeting');
        if(!greetingEl) return;
        let name = localStorage.getItem('visitor_name') || '';
        if(!name){
            // If no name stored, prompt user (non-blocking friendly)
            name = prompt('Please enter your name for a personalized greeting:', '') || '';
            if(name) localStorage.setItem('visitor_name', name);
        }
        if(name){
            greetingEl.textContent = `Hi ${name}, Welcome To Website`;
        } else {
            greetingEl.textContent = `Hi, Welcome To Website`;
        }
    }

    const changeBtn = document.getElementById('changeName');
    if(changeBtn){
        changeBtn.addEventListener('click', () => {
            const newName = prompt('Enter new name:', localStorage.getItem('visitor_name') || '');
            if(newName !== null){
                localStorage.setItem('visitor_name', newName);
                loadGreeting();
            }
        });
    }

    document.addEventListener('click', e => {
        if(!e.target.matches('.menu-toggle')) return;
        const nav = document.querySelector('.nav');
        if(!nav) return;
        const shown = nav.style.display === 'flex';
        nav.style.display = shown ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.background = '#fff';
        nav.style.position = 'absolute';
        nav.style.right = '1rem';
        nav.style.top = '64px';
        nav.style.padding = '0.6rem';
        nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)';
    });

    const form = document.getElementById('messageForm');
    const preview = document.getElementById('previewBox');
    if(form && preview){
        form.addEventListener('submit', function(ev){
            ev.preventDefault();
            clearErrors(form);

            const formData = new FormData(form);
            const name = (formData.get('name') || '').trim();
            const dob = (formData.get('dob') || '').trim();
            const gender = formData.get('gender') || '';
            const message = (formData.get('message') || '').trim();

            let hasError = false;

            if(!name || name.length < 2){
                showError('name', 'Nama minimal 2 karakter');
                hasError = true;
            }
            if(!dob){
                showError('dob', 'Tanggal lahir wajib diisi');
                hasError = true;
            } else {
                // validate date not in the future
                const d = new Date(dob);
                if(isNaN(d.getTime()) || d > new Date()){
                    showError('dob', 'Tanggal lahir tidak valid');
                    hasError = true;
                }
            }
            if(!gender){
                showError('gender', 'Pilih jenis kelamin');
                hasError = true;
            }
            if(!message || message.length < 8){
                showError('message', 'Pesan minimal 8 karakter');
                hasError = true;
            }

            if(hasError) return;

            const now = new Date();
            const previewText =
                `Current time: ${now.toString()}
Nama: ${name}
Tanggal Lahir: ${dob}
Jenis Kelamin: ${gender}
Pesan: ${message}
`;
            preview.textContent = previewText;

            alert('Message submitted — preview updated on the right.');
        });
    }

    function showError(fieldName, msg){
        const el = document.querySelector(`.error[data-for="${fieldName}"]`);
        if(el) el.textContent = msg;
    }
    function clearErrors(form){
        const errors = form.querySelectorAll('.error');
        errors.forEach(e=> e.textContent = '');
    }

    document.addEventListener('DOMContentLoaded', function(){
        loadGreeting();
    });

})();
