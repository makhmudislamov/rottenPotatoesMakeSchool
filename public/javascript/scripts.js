

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
                            <h4 class="card-title">${response.data.comment.title}</h4>
                    <p class = "card-text" >${response.data.comment.content}</p>
                    <!-- Delete link -->
                    <button class="btn btn-link delete-comment" id="deleteComment" data-comment-id="${response.data.comment._id}">Delete</button>
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

     document.querySelector('.delete-comment').addEventListener('click', (e) => {
        console.log("click!")
        //  let commentId = this.getAttribute('data-comment-id')
         let commentId = $(e.target).attr('data-comment-id');
        // check the route
         axios.delete(`/movies/:movieId/reviews/:id/comments/${commentId}`)

            .then(response => {
                console.log(response)
                $(`#${commentId}`).remove();
            })
            .catch(error => {
                console.log(error);
                alert('There was an error deleting this comment.')
            });
    })

};
