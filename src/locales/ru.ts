import { LocaleDictionary } from '../types/localeDictionary';
import { firebaseErrorsRu } from './firebaseErrorsRu';

const ru: LocaleDictionary = {
  lang: 'ru',
  home: {
    title: 'GraphiQL Playground - NextFireTeam',
    h1: 'Добро пожаловать в GraphiQL Playground!',
    aboutPlayground:
      'Наша платформа поддерживает различные конечные точки и позволяет вам вводить запросы, переменные и заголовки. Вы можете выполнять запросы и наслаждаться результатами. GraphiQL Playground предоставляет удобный и интуитивно понятный интерфейс для исследования возможностей GraphQL API. Давайте вместе раскроем силу GraphQL при помощи GraphiQL Playground!',
    authLink: 'Пожалуйста, авторизируйтесь',
    mainLink: 'Перейти в GraphiQL Playground',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    signOut: 'Выйти',
    graphiQL: 'Войти в GraphiQL',
    stack: 'Стек использованных технологий',
    stackDescription:
      'Приложение разработано с использованием современного технологического стека: ReactJS, Next.js, TypeScript, Firebase, HTML5 и CSS3.',
  },
  main: {
    title: 'GraphiQL Playground - Основная Страница',
    endpointButton: 'Сменить адрес',
    endpointText: 'Адрес:',
    invalidEndpoint: 'Ошибочный адрес',
    variablesPlaceholder: 'Переменные',
    variablesLable: 'ПЕРЕМЕННЫЕ',
    headersPlaceholder: 'Заголовки',
    headersLable: 'ЗАГОЛОВКИ',
    docsLable: 'ДОКА',
    queryPlaceholder: 'Запрос [Для подсказок нажмите Ctrl + Пробел]',
  },
  docs: {
    title: 'Проводник по документации',
    descrStart: 'Схема GraphQL предоставляет корневой тип для каждого вида операций.',
    descrAbsence: 'Нет описания',
    schemaLibrary: 'Схема',
    rootType: 'корневой тип',
    fields: 'поля',
    type: 'тип',
    argumentsLibrary: 'аргументы',
    noSchema: 'НЕТ СХЕМЫ',
  },
  auth: {
    title: 'GraphiQL Playground - Авторизация',
    passwordText: 'Пароль',
    confirmPasswordText: 'Подтвердите пароль',
    signUpText: 'Зарегистируйтесь с помощью email и пароля',
    signInText: 'Войдите с помощью email и пароля',
    isRegistered: 'Уже зарегистрированы? ',
    isNotRegistered: 'Не зарегистированы? ',
    goToSignIn: 'Войдите',
    goToSignUp: 'Зарегистрируйтесь',
    notValidEmail: 'Недопустимый адрес электронной почты',
    notValidPassword:
      'Недопустимый пароль. Пароль должен быть не менее 8 символов и содержать не менее одной буквы, одной цифры, одного специального символа',
    notValidConfirmPassword: 'Недопустимый пароль подтверждения. Должен быть равен паролю',
  },
  404: {
    title: 'GraphiQL Playground - Страница не найдена - 404',
    h2: 'Страница не найдена',
    goHome: 'На главную страницу',
  },
  firebaseErrors: firebaseErrorsRu,
};

export default ru;
