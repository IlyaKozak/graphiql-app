## App Requirements
*https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md*


## Deployment
*https://nextfireteam.netlify.app/*


## Run / Build App

Rename ```.env.sample``` to ```.env.local``` and add firebase environment variables to enable email/password authentification:

```
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_APP_ID=
```

---

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

Build a static site / single-page application (SPA) ready for deployment to ```./out``` folder:

```bash
npm run build
```

## Cross-Check [90/90 points]

### Welcome route [10 points] 

- [x] The welcome page contains general information about the developers, project, and course **+2 pts**  
- [x] In the upper right corner there are 2 buttons: Sign In and Sign Up **2 pts**  
- [x] If login token is valid and unexpired, Sign In and Sign Up buttons changed to the "Go to Main/GraphiQL" button **2 pts**  
- [x] When the token expires - the user is redirected to the "Welcome page" automatically **3 pts**  
- [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form **1 pts**  

### Sign In / Sign Up [20 points]
- [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be **5 pts**
- [x] Client-side validation is implemented **10 pts**
- [x] Upon successful login, the user is redirected to the Main/GraphiQL page **3 pts**
- [x] If the user is already logged in and tries to reach these routes, he/she is redirected to the Main/GraphiQL page **2 pts**

### GraphiQL route [50 points] 
- [x] Working editor allowing to edit the query **15 pts**
- [x] Working documentation explorer (visible only when SDL request is successful) **15 pts**
- [x] Variables section (can be closed/opened) **5 pts**
- [x] Headers section (can be closed/opened) **5 pts**
- [x] Response section **10 pts**

### General requirements [10 points]
- [x] Localization (en/ru) **5 pts**
- [x] Sticky (animated) header **5 pts**

