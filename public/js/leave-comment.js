const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-desc').value;
  // this gets the project id number from the URL:
  const project_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  // user's comments ============================================== //

  if (!text) {
    alert("You must enter a comment to submit")
  } else {
    console.log(text)
    const response = await fetch(`/api/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ text, project_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (response.ok) {
      console.log('new comment made')
      document.location.reload();
    } else {
      alert('Failed to make a comment');
    }
  }
};

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);




