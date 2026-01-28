# 💛📖 BookBud 📖💛
## Here to make book clubbing fun!

## 🗺️ Description
BookBud is a web application designed to make book club reading more modern and motivating.
The app allows members of a book club to follow a shared reading journey by tracking their own progress, viewing how other members are doing, and being asked questions they can reflect on while reading.

An admin manages the books, while members focus on reading and tracking the other members' progress.
BookBud was inspired by a real-life book club experience and the desire to create a more modern, interactive alternative to traditional book club communication.


## 🧚🏼‍♀️Purpose
Have you ever been in a book club? This is how it usually goes for me: I procastinate reading the book, I stress read the last pages on the way to the meeting and once I'm there and get asked "So what did you think?". I realize that I don't really know what I thought of the book. The others usually feel the same way, so we just go "It was good..." and then we start talking about other things. There must be a better way to run a book club! This is why I created BookBud! I wanted the user to be more motivated while reading the book, see how the others are doing and stop and reflect. Reading teaches us new things, gives us fresh perspectives and inspires us. A book club can strengthen friendships and make us think and talk about topics that might not have ever been brought up otherwise. In a time of doom scrolling and brain rot, I think book clubs could be more important now than ever! 


## ✨ Features
This website includes several key features:

- User authentication with role-based access (admin / member)
- One active book at a time, managed by the admin
- Reading progress tracking based on total page count
- Visual overview of members’ progress
- Finished books view with reading history
- Responsive design for desktop, tablet, and mobile
- Clear and friendly UI focused on usability


## 🧠 Architecture & Backend
BookBud is built as a full-stack application with a clear separation between frontend and backend responsibilities.

The frontend is developed using React, TypeScript, and Vite, with a component-based structure and reusable UI patterns. Styling is handled with Sass, allowing consistent theming and scalable styles.

The backend is connected to MongoDB Atlas, which stores users, books and reading progress in a flexible document-based structure.
The data model is designed to support both current functionality and future expansion, such as book ratings and extended admin features.


## 💛 Accessibility & UX
Accessibility and user experience have been important considerations throughout the project.

- Semantic HTML and clear component structure

- Readable typography and sufficient contrast

- Keyboard-friendly navigation

- Responsive layouts adapted for mobile-first usage

Lighthouse and manual testing were used to evaluate accessibility, performance, and usability during development.


## 👩🏻‍💻 Tech Stack

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)


## 📸 Site Screenshots

Here are some screenshots from the site:

<div style=" gap: 1rem;">
  <img src="https://github.com/user-attachments/assets/9be51c61-5d37-431a-8c4c-6cec1c478e7b" alt="Login page on mobile" width="350"/>
  <img src="https://github.com/user-attachments/assets/a0f2b979-2b27-4de7-9dce-c05150a9bd4a" alt="Current book page on mobile" width="350"/>
  <img src="https://github.com/user-attachments/assets/37295c17-de1d-4fe4-aac0-536f339992ef" alt="Members' progress page on mobile" width="350"/>
  <img src="https://github.com/user-attachments/assets/9c819217-f11a-4332-a416-5c600aa0d129" alt="Finished books page on mobile" width="350"/>
  <img src="https://github.com/user-attachments/assets/26a99318-d091-4e9f-bb49-745a949be1b0" alt="Admin panel on mobile" width="350"/>
</div>


## 🌱 Next Steps
If development continues, the project could be expanded in several ways:

- **Book ratings:** allow members to rate finished books with 1–5 stars and display an average rating on the *Finished books* page  
- **Clearer book states:** introduce an explicit `isFinished` property instead of relying on `isActive` alone  
- **Richer club features:** enable admins to manage members and, in the future, support multiple book clubs  
- **Authentication & quality:** implement JWT-based authentication, add unit tests, and set up automated checks with GitHub Actions  


## 🔗 Live Version & Repository Link

You can view the live version of this project [here](bookbud-client.vercel.app/). 

Repository link:
https://github.com/KarinHson/BookBud


## 📝 Author

Karin Henriksson – Project lead and developer
[@KarinHson](https://github.com/KarinHson)
