// public/script.js
document.getElementById('changeText').addEventListener('click', function() {
    document.querySelector('h1').textContent = 'Text Changed!';
});

document.getElementById('profilePictureInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('profile-picture');
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('backgroundPictureInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

function handleAddLink() {
    const linksList = document.getElementById('links-list');
    const newLink = prompt('Enter the URL of the new link:');
    if (newLink) {
        const li = document.createElement('li');
        li.textContent = newLink;
        linksList.appendChild(li);
    }
}

function handleSubmitChanges() {
    alert('Changes submitted!');
}