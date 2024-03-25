const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-desc').value;

  // user's comments

  if (text) {
    console.log(text)
    const response = await fetch(`/commentRoutes`, {
      method: 'POST',
      body: JSON.stringify({ text }),
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

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);




