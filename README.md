# GIT USER

This is a simple react application with vite bundler and swc. It uses github api from https://developer.github.com/v3/ to fetch user data and repositores. You can access demo for this project at https://git-user-cbb5a.web.app/.


## Local setup
1. Clone this repository

```sh
git clone git@github.com:wypratama/git-user.git
```
2. This repository used pnpm, so you might need to install it if you haven't

```sh
npm install -g pnpm
```
3. Install dependecies

```sh
pnpm install
```
4. Run project locally

```sh
pnpm run dev
```

## Dependencies

List of dependencies used in this project:
1. **axios**: Used to help fetching data from client
2. **tailwind**: CSS libraries to help speed up with styling
3. **daisyui**: Tailwind based ui component to help with styles and component theme
4. **react-use-reactive**: Deeply nested reactive state managemenet, used because i made it :)
5. **rome**: Linter and formatter to help with code style

