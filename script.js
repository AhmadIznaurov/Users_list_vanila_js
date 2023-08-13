document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#id');
    const cleanerImg = document.querySelector('.img-cleaner');
    const filterText = document.querySelector('.clean-filter');
    const sortingButtons = document.querySelectorAll('.button-content button');
    const tableRows = document.querySelectorAll('#table-row');
    const paginationContainer = document.querySelector('.pagination');
    const deleteButtons = document.querySelectorAll('#delete-button');
 
// Функция для поиска пользователей
function searchUsers() {
  const searchValue = searchInput.value.toLowerCase();
  
  tableRows.forEach(row => {
    const name = row.querySelectorAll('tr td')[0].textContent.toLowerCase();
    const email = row.querySelectorAll('tr td')[1].textContent.toLowerCase();
    
    if (name.includes(searchValue) || email.includes(searchValue)) {
      row.style.display = 'table-row';
    } else {
      row.style.display = 'none';
    }
  });
}

// Слушатель события на поле ввода поиска
searchInput.addEventListener('input', searchUsers);

// Функция для очистки фильтра
function clearFilter() {
  searchInput.value = '';
  
  tableRows.forEach(row => {
    row.style.display = 'table-row';
  });
}

// Слушатель события на кнопку очистки фильтра
cleanerImg.addEventListener('click', clearFilter);
filterText.addEventListener('click', clearFilter);

// Функции для сортировки таблицы
function sortByRegistrationDate() {
  const sortedRows = Array.from(tableRows).sort((a, b) => {
    const dateA = new Date(a.querySelector('#registration-date').textContent);
    const dateB = new Date(b.querySelector('#registration-date').textContent);
    return dateA - dateB;
  });
  
  tableRows.forEach(row => {
    row.remove();
  });
  
  sortedRows.forEach(row => {
    document.querySelector('#table-body').appendChild(row);
  });
}

function sortByRating() {
  const sortedRows = Array.from(tableRows).sort((a, b) => {
    const ratingA = parseInt(a.querySelector('#rating').textContent);
    const ratingB = parseInt(b.querySelector('#rating').textContent);
    return ratingB - ratingA;
  });
  
  tableRows.forEach(row => {
    row.remove();
  });
  
  sortedRows.forEach(row => {
    document.querySelector('#table-body').appendChild(row);
  });
}

// Слушатели событий на кнопки сортировки
sortingButtons[1].addEventListener('click', sortByRegistrationDate);
sortingButtons[2].addEventListener('click', sortByRating);

// Реализация удаления пользователя из списка
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('#table-row');
      row.remove();
    });


// Реализация пагинации
const itemsPerPage = 10;
const rowsCount = tableRows.length;
const pagesCount = Math.ceil(rowsCount / itemsPerPage);

function createPagination() {
    paginationContainer.innerHTML = '';
  
    for (let i = 1; i <= pagesCount; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.textContent = i;
  
      if (i === 1) {
        pageLink.classList.add('active');
      }
  
      pageLink.addEventListener('click', function() {
        const currentPage = document.querySelector('.pagination a.active');
  
        if (currentPage) {
          currentPage.classList.remove('active');
        }
  
        this.classList.add('active');
  
        const start = (i - 1) * itemsPerPage;
        const end = start + itemsPerPage;
  
        tableRows.forEach((row, index) => {
          if (index >= start && index < end) {
            row.style.display = 'table-row';
          } else {
            row.style.display = 'none';
          }
        });
      });
  
      paginationContainer.appendChild(pageLink);
    }
  
    // Запрос к серверу и заполнение таблицы
    $.get("https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users", function(data) {
        let users = data;
        let table = $("#table-body");
    
        users.forEach(function(user) {
          let row = $("<tr>");
          let nameCell = $("<td>").text(user.username);
          let emailCell = $("<td>").text(user.email);
          let registrationDateCell = $("<td>").text(user.registration_date);
          let ratingCell = $("<td>").text(user.rating);
    
          row.append(nameCell, emailCell, registrationDateCell, ratingCell);
          table.append(row);
        });
    });
  }
  createPagination();

  });
});
    