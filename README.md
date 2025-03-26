# Tactics Shop

Магазин тактиков с клиентской частью и API.



## Установка и запуск

### Склонируйте репозиторий:

```bash
git clone https://github.com/Bustle101/semester_1.git
cd semester_1
```

### Предварительные требования
- Node.js (версия 14 или выше)
- npm или yarn

### Установка зависимостей

Установите зависимости проекта:
```bash
npm install react@18 react-dom@18
npm install
```

Если будет ошибка, то
```bash
npm install --legacy-peer-deps
npm install react@18 react-dom@18
npm install
```

### Запуск проекта

1. Запустите сервер:
```bash
json-server --watch public/data.json --port 3001
```
Сервер будет доступен по адресу: http://localhost:3001

2. Запустите клиентскую часть:
```bash
npm run dev
```
Клиентская часть будет доступна по адресу: http://localhost:5173

## API Документация (Swagger)
```bash
npm run server
```
Swagger доступен по адресу: http://localhost:3001/api-docs


## Технологии

- React
- Material-UI
- Express
- JSON Server
- Swagger

## Важно

- Убедитесь, что порт 3001 не занят другими приложениями
- Для работы с API необходимо запустить сервер



