function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8080/api/notifications',{headers:{'Authorization': `Bearer ${token}`}})
        .then( res => res.json())
        .then( 
            data => {
            const lst = document.getElementById('list');
            data.forEach( el => {
                lst.innerHTML += `
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Notifications</h5>
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${el.id}</h6>
                    <p><b>Content: </b>${el.content}</p>
                    <p><b>Board: </b>${el.announcmentID}</p>
                  </div>
            `;
            });
        });

            document.getElementById('deleteModalSubmit').addEventListener('click', e => {
                e.preventDefault();
    
        
                var url = new URL('http://127.0.0.1:8080/api/notifications/'+document.getElementById('inputID').value);
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
                    content: document.getElementById('inputContent').value,
                    announcmentID: document.getElementById('inputBoard').value
                };
        
                document.getElementById('inputContent').value='';
                document.getElementById('inputBoard').value='';
        
                console.log(data);
                fetch('http://127.0.0.1:8080/api/notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( data => {
                        document.getElementById('list').innerHTML += `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">Notification</h5>
                          <h6 class="card-subtitle mb-2 text-muted">ID: ${data.id}</h6>
                          <p><b>Content: </b>${data.content}</p>
                          <p><b>Board: </b>${data.board}</p>

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
        
                var url = new URL('http://127.0.0.1:8080/api/notifications/'+document.getElementById('inputEditID').value);
                document.getElementById('inputEditID').value='';
                fetch(url, {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${token}`}
                })
                    .then( res => res.json() )
                    .then( data => {
                    $('#editModal').modal('hide');
                    $("#inputEditModal").modal('show');

                    document.getElementById('inputEditBoard').value=data.announcmentID,
                    document.getElementById('inputEditID2').value=data.id,
                    document.getElementById('inputEditContent').value=data.content
                    })
                    ;

             });
             $(function() {
                $('#ed').click(function(){
                    // Matching strategy 
                        const data = {
                            content: document.getElementById('inputEditContent').value,
                            announcmentID: document.getElementById('inputEditBoard').value
                        };
                        document.getElementById('inputEditContent').value='';
                        document.getElementById('inputEditBoard').value='';
                        var url = new URL('http://127.0.0.1:8080/api/notifications/'+document.getElementById('inputEditID2').value);
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
                    content: document.getElementById('inputEditContent').value,
                    announcmentID: document.getElementById('inputEditBoard').value
                };
                document.getElementById('inputEditContent').value='';
                document.getElementById('inputEditBoard').value='';
                var url = new URL('http://127.0.0.1:8080/api/notifications/'+document.getElementById('inputEditID2').value);
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
