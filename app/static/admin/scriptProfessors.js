function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8080/api/professors', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json())
        .then( 
            data => {
            const lst = document.getElementById('list');
            data.forEach( el => {
                lst.innerHTML += `<div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${el.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">ID: ${el.id}</h6>
                <p><b>Email: </b>${el.email}</p>
                <p><b>Password: </b>${el.password}</p>
                <p><b>Datum created: </b>${el.createdAt}</p>
                </div>
            </div>`;
            });
        }).catch(err=>
            console.log(err));

            document.getElementById('deleteModalSubmit').addEventListener('click', e => {
                e.preventDefault();
    
        
                var url = new URL('http://127.0.0.1:8080/api/professors/'+document.getElementById('inputID').value);
                console.log(url);
                document.getElementById('inputID').value='';
                fetch(url, {
                    method: 'DELETE',
                    headers:{'Authorization': `Bearer ${token}`}
                })
                    .then( res => res.json() )
                    .then( data => {
                    document.location.reload();
                    })
                    ;

            });


            document.getElementById('inputModalSubmit').addEventListener('click', e => {
                e.preventDefault();
        
                const data = {
                    name: document.getElementById('inputName').value,
                    password: document.getElementById('inputPassword').value,
                    email: document.getElementById('inputEmail').value
                };
        
                document.getElementById('inputName').value='';
                document.getElementById('inputPassword').value='';
                document.getElementById('inputEmail').value='';
        
                console.log(data);
                fetch('http://127.0.0.1:8080/api/professors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( data => {
                        document.getElementById('list').innerHTML += `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">${data.name}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">ID: ${data.id}</h6>
                          <p><b>Email: </b>${data.email}</p>
                          <p><b>Password: </b>${data.password}</p>
                          <p><b>Date created: </b>${data.createdAt}</p>
                        </div>
                    </div>`;
                    });
                    // .catch(err => {
                    //     console.log(err);
                    // })
                    

            });

        

            document.getElementById('editSubmit').addEventListener('click', e => { 
                name: document.getElementById('inputEditName').value,
                 document.getElementById('editModal').style.display="none";
                 e.preventDefault();
    
        
                var url = new URL('http://127.0.0.1:8080/api/professors/'+document.getElementById('inputEditID').value);
                console.log(url);
                document.getElementById('inputEditID').value='';
                fetch(url, {
                    method: 'GET',
                    headers:{'Authorization': `Bearer ${token}`}
                })
                    .then( res => res.json() )
                    .then( data => {
                    $("#inputEditModal").modal('show');
                    document.getElementById('inputEditID2').value=data.id,
                    document.getElementById('inputEditName').value=data.name,
                    document.getElementById('inputEditPassword').value=data.password,
                    document.getElementById('inputEditEmail').value=data.email
                    })
                    ;

            });

            document.getElementById('inputEditModalSubmit').addEventListener('click', e => {
                e.preventDefault();
        
                const data = {
                    name: document.getElementById('inputEditName').value,
                    password: document.getElementById('inputEditPassword').value,
                    email: document.getElementById('inputEditEmail').value
                };
        
                document.getElementById('inputEditName').value='';
                document.getElementById('inputEditPassword').value='';
                document.getElementById('inputEditEmail').value='';
                var url = new URL('http://127.0.0.1:8080/api/professors/'+document.getElementById('inputEditID2').value);
                console.log(data);
                fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( data => { document.location.reload();})
                    ;

            });

            document.getElementById('logout').addEventListener('click', e => {
                window.location.href = '/index';
            });
    }


