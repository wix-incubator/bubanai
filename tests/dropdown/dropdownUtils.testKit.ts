export const dropdownHtmlStructure = `<html>
  <head>
    <style>
      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-toggle {
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        border-top: none;
        display: none;
      }

      .dropdown-item {
        padding: 10px;
        cursor: pointer;
      }

      .dropdown-item:hover {
        background-color: #e5e5e5;
      }
    </style>
  </head>
  <body>
    <div class="dropdown">
      <div id="dropdown-open">Select an option</div>
      <div id="dropdown-menu">
        <li class="dropdown-item" data-value="option1" value="1">Option 1</li>
        <li class="dropdown-item" data-value="option2" value="2">Option 2</li>
        <li class="dropdown-item disabled" data-value="option3" value="3">Option 3</li>
        <li class="dropdown-item" data-value="option4">Option 4</li>
        <li class="dropdown-item" data-value="option4" value="14">Option 14</li>
      </div>
    </div>

    <script>
      const dropdownToggle = document.querySelector('#dropdown-open');
      const dropdownMenu = document.querySelector('#dropdown-menu');

      let isDropdownOpen = false;

      dropdownToggle.addEventListener('click', () => {
        if (isDropdownOpen) {
          dropdownMenu.style.display = 'none';
        } else {
          dropdownMenu.style.display = 'block';
        }

        isDropdownOpen = !isDropdownOpen;
      });

      const dropdownItems = document.querySelectorAll('.dropdown-item');

      dropdownItems.forEach((item) => {
        item.addEventListener('click', () => {
          dropdownToggle.textContent = item.textContent;
          dropdownMenu.style.display = 'none';
          isDropdownOpen = false;

          dropdownItems.forEach((item) => {
            item.classList.remove('selected');
          });

          item.classList.add('selected');
        });
      });

        dropdownMenu.style.display = 'none';
    </script>
  </body>
</html>`;
