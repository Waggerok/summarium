# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


# JSX Теги в React Native и их HTML-аналоги

| React Native        | HTML (React.js) Equivalent        | Описание |
|---------------------|-----------------------------------|----------|
| `<View>`            | `<div>`                           | Контейнер для группировки элементов. |
| `<Text>`            | `<p>`, `<span>`, `<h1>` и т.п.    | Элемент для отображения текста. |
| `<ScrollView>`      | `<div style="overflow: scroll">`  | Прокручиваемый контейнер. |
| `<TextInput>`       | `<input type="text">`, `<textarea>` | Поле для ввода текста. |
| `<Image>`           | `<img>`                           | Компонент для отображения изображений. |
| `<Button>`          | `<button>`                        | Простая кнопка. |
| `<TouchableOpacity>`| `<button>`, `<div onClick>`       | Нажимаемый элемент с прозрачностью при касании. |
| `<FlatList>`        | `<ul>`, `.map()`                  | Эффективный список. |
| `<SectionList>`     | `<dl>` и подобные                 | Список с секциями. |
| `<SafeAreaView>`    | `<div>` с дополнительными отступами | Учитывает безопасные зоны на устройствах. |
| `<TouchableHighlight>` | `<div>` с onClick и визуальным эффектом | Элемент с подсветкой при нажатии. |
| `<Pressable>`       | `<div onMouseDown>` и т.п.        | Гибкий компонент для обработки нажатий. |
| `<KeyboardAvoidingView>` | —                            | Сдвигает элементы при появлении клавиатуры. |

