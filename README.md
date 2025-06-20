# Full Stack Application with Angular and .NET

This is a full-stack application built with Angular 20 frontend and .NET 8 backend.

## Project Structure

```
Angular And DotNet/
├── Angular/
│   └── SimpleClient/    # Angular frontend application
└── DotNet/
    └── SimpleAPI/       # .NET backend API
```

## Backend Setup (.NET)

1. Navigate to the SimpleAPI directory:
```bash
cd DotNet/SimpleAPI
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the application:
```bash
dotnet run
```

The API will be available at `https://localhost:5000`

## Frontend Setup (Angular)

1. Navigate to the SimpleClient directory:
```bash
cd Angular/SimpleClient
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## Development Tools Required

- .NET SDK 8.0 or later
- Node.js 18.x or later
- Angular CLI 20.0.2
- A code editor (VS Code recommended)

## Database

The application uses SQLite as its database, which is file-based and requires no additional setup.

## License

This project is licensed under the MIT License.
