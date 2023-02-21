function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://127.0.0.1:8080/api/lessons',{headers:{'Authorization': `Bearer ${token}`}})
        .then( res => res.json())
        .then( 
            data => {
            const lst = document.getElementById('list');
            data.forEach( el => {
                lst.innerHTML += `
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">${el.number}.lesson of ${el.lessonDate} </h5>
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${el.id}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Classroom ID: ${el.classroomId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Subject ID: ${el.subjectId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Schedule ID: ${el.scheduleId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Number: ${el.number}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Lesson date: ${el.lessonDate}</h6>
                    </div>
            `;
            });
        });

            document.getElementById('deleteModalSubmit').addEventListener('click', e => {
                e.preventDefault();
    
        
                var url = new URL('http://127.0.0.1:8080/api/lessons/'+document.getElementById('inputID').value);
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
                    number:document.getElementById('inputNumber').value,
                    scheduleId:document.getElementById('inputSchedule').value,
                    subjectId:document.getElementById('inputSubject').value,
                    time:document.getElementById('inputTime').value,
                    lessonDate:document.getElementById('inputDate').value,
                    classroomId:document.getElementById('inputClassroom').value     
                };
    
        
                console.log(data);
                fetch('http://127.0.0.1:8080/api/lessons/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`},
                    body: JSON.stringify(data)
                })
                    .then( res => res.json() )
                    .then( data => {
                        document.getElementById('list').innerHTML += `<div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${data.id}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Classroom ID: ${data.classroomId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Subject ID: ${data.subjectId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Schedule ID: ${data.scheduleId}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Number: ${data.number}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Lesson date: ${data.lessonDate}</h6>
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
        
                var url = new URL('http://127.0.0.1:8080/api/lessons/'+document.getElementById('inputEditID').value);
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
                    document.getElementById('inputEditNumber').value=data.number,
                    document.getElementById('inputEditSchedule').value=data.scheduleId,
                    document.getElementById('inputEditSubject').value=data.subjectId,
                    document.getElementById('inputEditTime').value=data.time,
                    document.getElementById('inputEditDate').value=data.lessonDate,
                    document.getElementById('inputEditClassroom').value=data.classroomId                   
                    })
                    ;

             });
             $(function() {
                $('#ed').click(function(){
                   // e.preventDefault();
                    // Matching strategy 
                        const data = {
                            id:document.getElementById('inputEditID2').value,
                            number:document.getElementById('inputEditNumber').value,
                            scheduleId:document.getElementById('inputEditSchedule').value,
                            subjectId:document.getElementById('inputEditSubject').value,
                            time:document.getElementById('inputEditTime').value,
                            lessonDate:document.getElementById('inputEditDate').value,
                            classroomId:document.getElementById('inputEditClassroom').value     
                        };
                        var url = new URL('http://127.0.0.1:8080/api/lessons/'+document.getElementById('inputEditID2').value);
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
                            number:document.getElementById('inputEditNumber').value=data.number,
                            scheduleId:document.getElementById('inputEditSchedule').value=data.scheduleId,
                            subjectId:document.getElementById('inputEditSubject').value=data.subjectId,
                            time:document.getElementById('inputEditTime').value=data.time,
                            lessonDate:document.getElementById('inputEditDate').value=data.lessonDate,
                            classroomId:document.getElementById('inputEditClassroom').value=data.classroomId     
                };
                var url = new URL('http://127.0.0.1:8080/api/lessons/'+document.getElementById('inputEditID2').value);
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
