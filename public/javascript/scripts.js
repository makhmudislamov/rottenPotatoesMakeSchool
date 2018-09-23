
// // listen for a form submit event
//     document.getElementById("newComment").addEventListener("submit", e => {
//         // prevent the default form behavior
//         e.preventDefault();
//         // serialize the form data into an object
//          let comment = {};
//         const inputs = document.getElementsByClassName('form-control');
//         for (var i = 0; i < inputs.length; i++) {
//             comment[inputs[i].name] = inputs[i].value;
//         }
//         // use axios to initialize a post request and send in the form data


//         axios.post(`/movies/:movieId/reviews/:id/comments`, comment)
//         .then(function (response) {
//             // wait for the success response from the server

//             console.log(response);
//             // remove the information from the form
//             document.getElementById("newComment").reset();
//             // display the data as a new comment on the page
                // THis part is displaying not comments but everything after .prepend()
//             document.getElementById("newComment").prepend(
//                 `
//                 <div class="card" id="{{this._id}}">
//                     <div class="card-block">
//                         <h4 class="card-title">{{this.title}}</h4>
//                      <p class="card-text">{{this.content}}</p>
//                     <!-- Delete link -->
//                             <p>
//                                 <form method="POST" action="/movies/:movieId/reviews/:id/comments/{{this._id}}?_method=DELETE">
//                                     <button class="btn btn-link" type="submit">Delete</button>
//                                 </form>
//                             </p>
        
//     </div>
// </div>
//             `
//         );

//         })
//       .catch(function (error) {
//         console.log(error);
//         // handle any errors
//         alert('There was a problem saving your comment. Please try again.')
//       })
// });

window.onload = function () {

    // we get the form from the handlebard/html form
    let newCommentForm = document.getElementById("newComment");
    document.getElementById("newComment").addEventListener("submit", e => {

        e.preventDefault();

        // DONT USE serializeArray(), it returns an arrya but we want JSON
        let comment = $(newCommentForm).serialize();

        // use axios to initialize a post request and send in the form data
        axios.post(`/movies/:movieId/reviews/:id/comments`, comment)
            .then(function (response) {

                // we get the comment on a JSON format from the response
                let newComment = response.data.comment;
                newCommentForm.reset();


                $('#comments').prepend(
                    `
                    <div class="card" id="${response.data.comment._id}">
                        <div class="card-block">
                    
                    < p class = "card-text">${response.data.comment.content}</p>
                    <!-- Delete link -->
                    <p>
                        < form method = "POST"
                        action = "/movies/:movieId/reviews/:id/comments/${response.data.comment._id}?_method=DELETE" >
                            <button class="btn btn-link" type="submit">Delete</button>
                        </form>
                    </p>
                    
                </div>
            </div>
            `
                );
            })
            .catch(function (error) {
                console.log(error);
                alert('There was a problem saving your comment. Please try again.')
            });
    });

};
