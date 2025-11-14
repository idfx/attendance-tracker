# Attendance Tracker

A React-based web application for tracking attendance. It helps employees monitor their attendance to ensure compliance with policies.

## Features

- **Interactive Calendar**: Click on dates to mark attendance days.
- **Automatic Calculations**: Tracks days in the last weeks and calculates the best.
- **Theme Toggle**: Switch between light and dark modes.
- **Persistence**: Saves attendance data and preferences in local storage.
- **Reset Option**: Clear all data and reset to current date.
- **Responsive Design**: Works on desktop and mobile devices.

## Technologies Used

- **React 19**: For building the user interface.
- **TypeScript**: For type safety.
- **Vite**: For fast development and building.
- **Material-UI (MUI)**: For UI components and theming.
- **MUI X Date Pickers**: For calendar and date selection.
- **date-fns**: For date manipulation and formatting.
- **Emotion**: For styling (used by MUI).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd attendance-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173` (or the port shown in the terminal).

## Usage

- Select your current date using the date picker.
- Click on calendar days to mark them as attended (blue highlight).
- View the list of weeks with attendance counts.
- Toggle theme with the sun/moon icon.
- Reset all data with the "Reset" button.

## Building for Production

To build the app for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## License

This project is private and not licensed for public use.
