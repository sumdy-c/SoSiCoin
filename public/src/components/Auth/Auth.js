class Auth extends MC {
    constructor() {
      super();
    }
  
    render() {
      // Создаем контейнер для формы авторизации
      const $container = $('<div>').addClass('auth-container');
      
      // Создаем заголовок
      const $header = $('<h1>').text('SosiCoin Авторизация').addClass('auth-header');
  
      // Создаем форму авторизации
      const $form = $('<form>').attr('id', 'authForm').addClass('auth-form');
  
      // Создаем поле ввода для имени пользователя
      const $usernameInput = $('<input>')
        .attr('type', 'text')
        .attr('name', 'username')
        .attr('placeholder', 'Имя пользователя')
        .addClass('form-input');
  
      // Создаем поле ввода для пароля
      const $passwordInput = $('<input>')
        .attr('type', 'password')
        .attr('name', 'password')
        .attr('placeholder', 'Пароль')
        .addClass('form-input');
  
      // Создаем кнопку отправки
      const $submitButton = $('<button>')
        .attr('type', 'submit')
        .text('Войти')
        .addClass('form-button');
  
      // Добавляем элементы в форму
      $form.append($usernameInput, $passwordInput, $submitButton);
  
      // Добавляем заголовок и форму в контейнер
      $container.append($header, $form);
  
      return $container;
    }
  }