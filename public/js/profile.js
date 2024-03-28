const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  // fetch user's projects/posts

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

// delete a post/project ================================================= //

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

// update post ============================================ //






async function updateFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('#upname').value;
  const description = document.querySelector('#updesc').value;

  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];


  const response = await fetch(`/api/projects/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        project_id: id,
        name,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

  if (response.ok) {
    document.location.replace(`/profile`);
  } else {
    alert(response.statusText);
  }
};

//document.querySelector('.update-project-form').addEventListener('submit', updateFormHandler);

// ============ //

document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);

document.querySelector('.project-list').addEventListener('click', delButtonHandler);