function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8080/api/apperances',{headers:{'Authorization': `Bearer ${token}`}})
        .then( res => res.json())
        .then( 
            data => {
            const lst = document.getElementById('list');
            data.forEach( el => {
                lst.innerHTML += `
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Apperance</h5>
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${el.id}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Notes: ${el.notes}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Student ID: ${el.studentId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Lesson ID: ${el.lessonId}</h6>
                    </div>
            `;
            });
        });

            document.getElementById('deleteModalSubmit').addEventListener('click', e => {
                e.preventDefault();
    
        
                var url = new URL('http://127.0.0.1:8080/api/apperances/'+document.getElementById('inputID').value);
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
                    notes: document.getElementById('inputNotes').value,
                    lessonId: document.getElementById('inputLesson').value,
                    studentId: document.getElementById('inputStudent').value
                };
        
        
                console.log(data);
                fetch('http://127.0.0.1:8080/api/apperances/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( data => {
                        document.getElementById('list').innerHTML += `<div class="card" style="width: 18rem;">
                        <div class="card-body">
                    <h5 class="card-title">Apperance</h5>
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${data.id}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Notes: ${data.notes}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Student ID: ${data.studentId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Lesson ID: ${data.lessonId}</h6>
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
        
                var url = new URL('http://127.0.0.1:8080/api/apperances/'+document.getElementById('inputEditID').value);
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
                    document.getElementById('inputEditNotes').value=data.notes,
                    document.getElementById('inputEditLesson').value=data.lessonId,
                    document.getElementById('inputEditStudent').value=data.studentId
                    })
                    ;

             });
             $(function() {
                $('#ed').click(function(){
                    //e.preventDefault();
                    // Matching strategy 
                        const data = {
                            notes: document.getElementById('inputEditNotes').value,
                            lessonId: document.getElementById('inputEditLesson').value,
                            studentId: document.getElementById('inputEditStudent').value
                        };
                        var url = new URL('http://127.0.0.1:8080/api/apperances/'+document.getElementById('inputEditID2').value);
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
            document.getElementById('logout').addEventListener('click', e => {
                window.location.href = '/index';
            });



    }
