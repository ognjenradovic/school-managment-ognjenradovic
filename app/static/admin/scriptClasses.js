function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8080/api/classes',{headers:{'Authorization': `Bearer ${token}`}})
        .then( res => res.json())
        .then( 
            data => {
            const lst = document.getElementById('list');
            data.forEach( el => {
                console.log(data);
                let card = `
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Class ${el.number}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${el.id}</h6>
                    <h6 class="card-subtitle mb-2">Students:</h6>`;
                el.Students.forEach(el1=>{
                    card+=`<p>${el1.name} ${el1.id}</p>`;
                });
                lst.innerHTML +=`</div>`;
                lst.innerHTML += card;
            });
        });

            document.getElementById('deleteModalSubmit').addEventListener('click', e => {
                e.preventDefault();
    
        
                var url = new URL('http://127.0.0.1:8080/api/classes/'+document.getElementById('inputID').value);
                console.log(url);
                document.getElementById('inputID').value='';
                fetch(url, {
                    headers:{'Authorization': `Bearer ${token}`},
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
                    number: document.getElementById('inputNumber').value,
                };
        
                document.getElementById('inputNumber').value='';
        
                console.log(data);
                fetch('http://127.0.0.1:8080/api/classes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( data => {
                        document.getElementById('list').innerHTML += `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">${data.number}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">ID: ${data.id}</h6>
                        </div>
                    </div>`
                    document.location.reload();
                    ;
                    })
                    // .catch(err => {
                    //     console.log(err);
                    // })
                    ;

            });

        

            document.getElementById('editSubmit').addEventListener('click', e => { 
                 e.preventDefault();
        
                var url = new URL('http://127.0.0.1:8080/api/classes/'+document.getElementById('inputEditID').value);
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
                    document.getElementById('inputEditNumber').value=data.number
                    })
                    ;

             });
             $(function() {
                $('#ed').click(function(){
                    // Matching strategy 
                        const data = {
                            number: document.getElementById('inputEditNumber').value
                        };
                        document.getElementById('inputEditNumber').value='';
                        var url = new URL('http://127.0.0.1:8080/api/classes/'+document.getElementById('inputEditID2').value);
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
            });
              


             document.getElementById('ed').addEventListener('click', e => {
                e.preventDefault();
        
                const data = {
                    number: document.getElementById('inputEditNumber').value,
                };
                document.getElementById('inputEditNumber').value='';
                var url = new URL('http://127.0.0.1:8080/api/classes/'+document.getElementById('inputEditID2').value);
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
