# Angular Demo Project Plan: Video Game Store

## High-Level Project Description

This project is a demo Angular application developed as part of the Quantexa onboarding process. It implements a video game store that demonstrates Angular core concepts, state management, UI libraries, and modern best practices.

The application allows users to:
- Search for games
- View paginated results
- See detailed information in a game details page
- Add games to a cart
- Complete a checkout form
- Generate a downloadable PDF order summary during checkout

The app integrates Angular concepts from both Quantexa team requirements and the Angular Essentials course by Academind (Maximilian Schwarzmüller). It is built using Angular with a modular architecture, PrimeNG for UI components, NgRx for state management, Signals for reactive state, RxJS for async operations, and Reactive Forms for user input.

---

## Angular Features & Core Concepts Demonstrated

- **Component Communication:** `@Input()` and `@Output()`
- **State Management:** NgRx for global state, Signals for reactive state
- **Async Data Handling:** Observables and RxJS operators
- **UI Components:** PrimeNG (table, paginator, overlay panel, form inputs)
- **Architecture:** Lazy-loaded feature modules, Shared/Core modules
- **Forms:** Reactive Forms with sync and async validation
- **Customization:** Custom Directives and Pipes (alongside built-in)
- **Dependency Injection:** Services and Http Interceptors
- **Lifecycle:** Lifecycle hooks (`OnInit`, `OnDestroy`, etc.)
- **Performance:** Change Detection strategy (`OnPush`)
- **PDF Generation:** External library (jsPDF or pdfMake)

---

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

3. **Open your browser:**  
   Visit [http://localhost:4200](http://localhost:4200) to view the app.

4. **Build for production:**
   ```bash
   ng build
   ```

5. **Run unit tests:**
   ```bash
   ng test
   ```
