function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8080/api/subjects',{
    headers:{'Authorization': `Bearer ${token}`}})
        .then( res => res.json())
        .then( 
            data => {
            const lst = document.getElementById('list');
            data.forEach( el => {
                lst.innerHTML += `
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${el.id}</h6>
                    <p><b>Book:</b> ${el.book}</p>
                  </div>
            `;
            });
        });

            document.getElementById('deleteModalSubmit').addEventListener('click', e => {
                e.preventDefault();
    
        
                var url = new URL('http://127.0.0.1:8080/api/subjects/'+document.getElementById('inputID').value);
                console.log(url);
                document.getElementById('inputID').value='';
                fetch(url, {
                    method: 'DELETE'
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
                    book: document.getElementById('inputBook').value
                };
        
                document.getElementById('inputName').value='';
                document.getElementById('inputBook').value='';
        
                console.log(data);
                fetch('http://127.0.0.1:8080/api/subjects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( data => {
                        document.getElementById('list').innerHTML += `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">${data.name}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">ID: ${data.id}</h6>
                          <p><b>Book:</b> ${data.book}</p>
                        </div>
                    </div>`;
                    })
                    // .catch(err => {
                    //     console.log(err);
                    // })
                    ;

            });

        

            document.getElementById('editSubmit').addEventListener('click', e => { 
                 e.preventDefault();
        
                var url = new URL('http://127.0.0.1:8080/api/subjects/'+document.getElementById('inputEditID').value);
                document.getElementById('inputEditID').value='';
                fetch(url, {
                    method: 'GET',
                    headers:{'Authorization': `Bearer ${token}`}
                })
                    .then( res => res.json() )
                    .then( data => {
                    $('#editModal').modal('hide');
                    $("#inputEditModal").modal('show');

                    document.getElementById('inputEditID2').value=data.id,
                    document.getElementById('inputEditName').value=data.name,
                    document.getElementById('inputEditBook').value=data.book
                    })
                    ;

             });
             $(function() {
                $('#ed').click(function(){
                    e.preventDefault();
                    // Matching strategy 
                        const data = {
                            name: document.getElementById('inputEditName').value,
                            book: document.getElementById('inputEditBook').value
                        };
                        document.getElementById('inputEditName').value='';
                        document.getElementById('inputEditBook').value='';
                        var url = new URL('http://127.0.0.1:8080/api/subjects/'+document.getElementById('inputEditID2').value);
                        console.log(data);
                        fetch(url, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
                            body: JSON.stringify(data)
                        })
                            .then( res => res.json() )
                            .then( data => { document.location.reload();})
                            ;
                });
            });
              


             document.getElementById('ed').addEventListener('click', e => {
                e.preventDefault();
        
                const data = {
                    name: document.getElementById('inputEditName').value,
                    book: document.getElementById('inputEditBook').value
                };
                document.getElementById('inputEditName').value='';
                document.getElementById('inputEditBook').value='';
                var url = new URL('http://127.0.0.1:8080/api/subjects/'+document.getElementById('inputEditID2').value);
                console.log(data);
                fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
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
