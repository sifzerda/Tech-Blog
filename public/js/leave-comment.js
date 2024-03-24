const newFormHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#project-name').value.trim();

  // user's comments

  if (text) {
    const response = await fetch(`/api/comments`, {
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

document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);


