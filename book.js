const bookForm = document.getElementById('add-book-form');
const booksList = document.getElementById('books-list');
const bookTitleInput = document.getElementById('book-title'); 
const bookAuthorInput = document.getElementById('book-author'); 
const bookYearInput = document.getElementById('book-year');
const bookDescriptionInput = document.getElementById('book-description');

bookForm.addEventListener('submit', function(event) {
	event.preventDefault();
	addBook();
});

function reAttachEventListeners(bookElement) {
	const deleteButton = bookElement.querySelector('.delete-button');
	deleteButton.addEventListener('click', function() {
		bookElement.remove();
	});

	const editButton = bookElement.querySelector('.edit-button');
	if (editButton) {
		editButton.addEventListener('click', function() {
			handleEdit(bookElement); 
		});
	}
}

function cancelEdit(bookElement, title, author, year, description) {
	const bookDetails = bookElement.querySelector('.book-details');
	const actionsDiv = bookElement.querySelector('.actions');
	
	bookDetails.innerHTML = `
		<h3 class="mb-1">${title}</h3>
		<p class="mb-1"><strong>Author:</strong> ${author}</p>
		<p class="mb-1"><strong>Year:</strong> ${year}</p>
		<p class="mb-1">${description}</p>
	`;
	
	actionsDiv.innerHTML = `
		<button class="btn btn-secondary btn-sm edit-button me-2">Edit</button>
		<button class="btn btn-danger btn-sm delete-button">Delete</button>
	`;
	
	reAttachEventListeners(bookElement); 
}

function saveEdits(bookElement) {
	const bookDetails = bookElement.querySelector('.book-details');
	const actionsDiv = bookElement.querySelector('.actions');

	const newTitle = bookDetails.querySelector('.edit-title').value.trim();
	const newAuthor = bookDetails.querySelector('.edit-author').value.trim();
	const newYear = bookDetails.querySelector('.edit-year').value.trim();
	const newDescription = bookDetails.querySelector('.edit-description').value.trim(); 	 	 
	
	if (newTitle === '') {
		return;
	}
	
	bookDetails.innerHTML = `
		<h3 class="mb-1">${newTitle}</h3>
		<p class="mb-1"><strong>Author:</strong> ${newAuthor}</p>
		<p class="mb-1"><strong>Year:</strong> ${newYear}</p>
		<p class="mb-1">${newDescription}</p>
	`;
	
	actionsDiv.innerHTML = `
		<button class="btn btn-secondary btn-sm edit-button me-2">Edit</button>
		<button class="btn btn-danger btn-sm delete-button">Delete</button>
	`;

	reAttachEventListeners(bookElement);
}

function handleEdit(bookElement) {
	const bookDetails = bookElement.querySelector('.book-details');
	const actionsDiv = bookElement.querySelector('.actions');
	
	const currentTitle = bookDetails.querySelector('h3').textContent;
	const currentAuthor = bookDetails.querySelector('p:nth-of-type(1)').textContent.replace('Author:', '').trim(); 	
	const currentYear = bookDetails.querySelector('p:nth-of-type(2)').textContent.replace('Year:', '').trim(); 	 	 	
	const currentDescription = bookDetails.querySelector('p:nth-of-type(3)').textContent.trim();
	bookDetails.classList.add('p-0'); 
	bookDetails.innerHTML = `
        <div class="row">
            <div class="col-12 mb-2">
                <input type="text" class="form-control edit-title" value="${currentTitle}">
            </div>
            <div class="col-12 mb-2">
                <input type="text" class="form-control edit-author" value="${currentAuthor}">
            </div>
            <div class="col-12 mb-2">
                <input type="text" class="form-control edit-year" value="${currentYear}">
            </div>
            <div class="col-12 mb-2">
                <textarea class="form-control edit-description">${currentDescription}</textarea>
            </div>
        </div>
    `;
    
	
	actionsDiv.innerHTML = `
		<button class="btn btn-success btn-sm save-button me-2">Save</button>
		<button class="btn btn-warning btn-sm cancel-button">Cancel</button>
	`;
	
	const saveButton = actionsDiv.querySelector('.save-button');
	saveButton.addEventListener('click', function() {
		saveEdits(bookElement); 
	});
	
	const cancelButton = actionsDiv.querySelector('.cancel-button');
	cancelButton.addEventListener('click', function() {
		cancelEdit(bookElement, currentTitle, currentAuthor, currentYear, currentDescription);
	});
}

function addBook() {
	const title = bookTitleInput.value.trim();
	const author = bookAuthorInput.value.trim();
	const year = bookYearInput.value.trim();
	const description = bookDescriptionInput.value.trim();
	
	if (title ==='') {
		return;
	}
	
	const bookElement = document.createElement('li');
	bookElement.classList.add(
		'col',
		'list-item',
		'mb-3',
		'p-3',
		'bg-light',
		'rounded',
		'shadow-sm',
		'border',
		'extra-space'
	);
	
	bookElement.innerHTML = `
		<div class="book-details">
			<h3 class="mb-1">${title}</h3>
			<p class="mb-1"><strong>Author:</strong> ${author}</p>
			<p class="mb-1"><strong>Year:</strong> ${year}</p>
			<p class="mb-1">${description}</p>
		</div>
		<div class="actions">
			<button class="btn btn-secondary btn-sm edit-button me-2">Edit</button> 
			<button class="btn btn-danger btn-sm delete-button">Delete</button>
		</div>
	`; 
	
	reAttachEventListeners(bookElement);
	
	booksList.appendChild(bookElement);
	bookTitleInput.value = '';
	bookAuthorInput.value = '';
	bookYearInput.value = '';
	bookDescriptionInput.value = '';
}