class Auth extends MC {
  constructor() {
    super();
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = $(e.target).serializeArray();

    const formValues = {};
    formData.forEach((field) => {
      formValues[field.name] = field.value;
    });

    if (!formValues.username || !formValues.password) {
      return;
    }

    fetch("auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }).then(async (data) => {
      const { user } = await data.json();

      if (!user) {
        return;
      }

      if (user === "invalidPass") {
        MC.getNotify("negative", "Пароль не тот. Вспоминай, я фиг скажу какой.");
        return;
      }

      if(user.type === 'newUser') {
        MC.User.set(user.data);
        MC.getNotify("positive", "Зарегался, вижу :)");
        MC.getAuth('authorized');
        return;
      }
      
      if(user.type === 'oldUser') {
        MC.User.set(user.data);
        MC.getNotify("positive", "С возвращением!");
        MC.getAuth('authorized');
        return;
      }
    });

    $(".form-input").each((_, elem) => $(elem).val(""));
  }

  render() {
    // Создаем контейнер для формы авторизации
    const container = $("<div>").addClass("auth-container");

    // Создаем заголовок
    const header = $("<h1>")
      .text("SosiCoin Авторизация/Регистрация")
      .addClass("auth-header");

    // Создаем форму авторизации
    const form = $("<form>")
      .attr("id", "authForm")
      .addClass("auth-form")
      .on("submit", this.handleSubmit);

    // Создаем поле ввода для имени пользователя
    const usernameInput = $("<input>")
      .attr("type", "text")
      .attr("name", "username")
      .attr("placeholder", "Имя пользователя")
      .addClass("form-input");

    // Создаем поле ввода для пароля
    const passwordInput = $("<input>")
      .attr("type", "password")
      .attr("name", "password")
      .attr("placeholder", "Пароль")
      .addClass("form-input");

    // Создаем кнопку отправки
    const submitButton = $("<button>")
      .attr("type", "submit")
      .text("Войти")
      .addClass("form-button");

    // Добавляем элементы в форму
    form.append(usernameInput, passwordInput, submitButton);

    // Добавляем заголовок и форму в контейнер
    container.append(
      header,
      form,
      $("<div>")
        .css({
          "margin-top": "40px",
          "font-weight": 700,
        })
        .text(
          "*Создатель сайта не защищает пароли, это юморестический ресурс написанный на коленке. Не используй тут свои настоящие данные, ты же не идиот ?"
        ),

      $("<div>")
        .css({
          "margin-top": "20px",
          "font-size": "10px",
          padding: "80px",
          color: "#2b2b2b",
        })
        .text(
          `Все материалы на данном ресурсе носят исключительно юмористический характер и предназначены для развлечения. Все совпадения с реальными людьми, организациями, событиями или фактами случайны и непреднамеренны. Автор не стремиться оскорбить или обидеть кого-либо. Все тексты и изображения создаются с целью поднятия настроения и не должны восприниматься всерьез. Обратите внимание, что все деньги, которые вы видите на данном сайте, не являются реальными и не имеют никакой финансовой ценности. Это всего лишь виртуальные элементы, созданные для игрового процесса и развлечения.`
        )
    );

    return container;
  }
}
