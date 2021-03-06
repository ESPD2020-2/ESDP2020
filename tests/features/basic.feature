#language:ru

Функционал: Регистрация пользователя
  Как анонимный пользователь
  Я хочу иметь возможность зарегистрироваться на сайте

  Сценарий:
    Допустим я нахожусь на странице регистрации
    Если я заполняю поля формы:
      | Логин | testlogin  |
      | Пароль | 123123 |
      | Фамилия | Иванов  |
      | Имя | Иван |
      | Отчество | Иванович  |
      | Телефон | 0555 55-55-55 |
      | Электронная почта | ivan@ya.ru |

    И нажимаю на кнопку "Зарегистрироваться"
    То я вижу текст "Registered successfully"

# Если необходимо запустить только один сценарий, перед ним ставиться тег @названиетега и тесты запускаются через --grep @названиетега (./test.sh --grep @wip)

  @wip
  Сценарий:
    Допустим я нахожусь на странице логина
    Если я заполняю поля формы:
      | Логин | admin |
      | Пароль | 123 |
    И нажимаю на кнопку "Bойти"
    То я вижу текст "Logged in successfully"
