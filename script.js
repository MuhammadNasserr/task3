fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((posts) =>
    posts.forEach((data) => {
      var apiContainer = document.getElementById("api");
      var post = document.createElement("div");
      post.classList.add(
        "post",
        "d-flex",
        "flex-column",
        "col-md-6",
        "text-white",
        "mb-2",
        "p-5",
        "border",
        "border-2",
        "gap-3"
      );
      document.querySelector("body").classList.add("bg-dark");
      post.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
            <img src="im12.png" alt="" class="text-left" />
            <p class="text-center col-md-6 ">${data.id}</p>
            </div>
            <h2 class="my-3 bg-primary p-3 text-center">${data.title}</h2>
            <p class="bg-secondary p-5">${data.body}</p>
            <button type="button" class="btn btn-outline-primary" data-post-id="${data.id}">Comments</button>
            <div class="comments"id="comments-${data.id}">
            </div>
        `;
      apiContainer.appendChild(post);
      post.querySelector("button").addEventListener("click", function () {
        const postId = this.getAttribute("data-post-id");
        const commentContainer = document.getElementById(`comments-${data.id}`);
        if (commentContainer.innerHTML === "") {
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then((response) => response.json())
            .then((comments) =>
              comments.forEach((comment) => {
                const commentElement = document.createElement("div");
                commentElement.innerHTML = `
                <p class="my-5 text-center"><strong>*${comment.name}</strong></p>
                <p>--${comment.body}</p>
                `;
                commentContainer.appendChild(commentElement);
              })
            );
        } else {
          commentContainer.innerHTML = "";
        }
      });
    })
  );
