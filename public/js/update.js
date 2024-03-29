
const updateFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
    const name = document.querySelector('#upname').value;
    const description = document.querySelector('#updesc').value;
  
    // fetch user's project by id

    //  if (name && description) {
    const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            name,
            description
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to update post');
    }
    //  }
};

document
    .querySelector('.update-project-form')
    .addEventListener('submit', updateFormHandler);


