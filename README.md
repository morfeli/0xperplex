# 0xperplex

0xperplex is a Next.js-based project that leverages modern web technologies and AI capabilities to create an engaging and interactive RAG answer engine with a focus on the users experience.

## 🌟 Features

- Built with Next.js 15.1.3 for optimal performance and SEO
- Integrates OpenAI's AI capabilities for intelligent interactions
- Utilizes Astra DB for efficient data management and it's specialized indexing system designed for vector searches, which allows it to quickly locate similar content based on vector embedding
- Implements a responsive and accessible UI with ShadCN components, built with RadixUI and TailwindCSS
- Employs TailwindCSS for streamlined styling

## 🔧 Dependencies

This project relies on several key dependencies:

| Category | Dependencies |
|----------|--------------|
| Framework | Next.js, React, React DOM |
| AI Integration | @ai-sdk/openai, openai |
| Database | @datastax/astra-db-ts |
| UI Components | @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-scroll-area, @radix-ui/react-slot, @radix-ui/react-toast, Lucide React |
| Styling | TailwindCSS, tailwind-merge, tailwindcss-animate |
| Animation | Motion, Embla Carousel |
| Utilities | class-variance-authority, clsx, dotenv |

## 💻 Installation

To get started with the project, follow these steps:

Clone the repository
git clone https://github.com/yourusername/0xperplex.git

Navigate to project directory
cd 0xperplex

Install dependencies
npm install

## 🚀 Usage Scripts

You can use the following scripts to manage the project:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Check code quality |


## 🎨 Unique Features

- 🤖 AI-powered interactions using OpenAI's SDK
- 💾 Efficient data management with Astra DB integration
- 🌈 Responsive and accessible UI components from ShadCN UI component library
- ✨ Smooth animations and transitions using the Motion library
- 🕒 Search history component, enabling users to easily revisit previous searches and interactions. This feature is implemented using localStorage, which stores user prompts in the browser, allowing them to access their search history even after refreshing the page or closing the browser.
- 🖼️ Wallpaper carousel, allowing users to select and change wallpapers dynamically, enhancing personalization within the application.
- 🌊 Seamless streaming of AI responses, providing users with a fluid experience as they receive answers in real time, enhancing engagement and interactivity.
- 📱 Mobile-first approach, ensuring that the application is optimized for mobile devices first. This design strategy enhances user experience by prioritizing essential content and features for smaller screens, which then scales up to larger devices. This results in faster loading times, improved navigation, and a more intuitive interface across all devices.
- 💡 Pre-prompt suggestions, offering users helpful hints or example queries to guide them in formulating their questions. This feature improves user engagement by making it easier for them to interact with the AI effectively.
- 🎨 Logo and background images created using Midjourney, leveraging AI to generate unique and visually appealing assets that enhance the overall aesthetic of the application. Midjourney allows for customization through detailed prompts, resulting in distinctive designs that contribute to the project's branding and user experience.
- 📜 Results container that scrolls down automatically, ensuring that users can easily view new responses as they arrive without needing to manually scroll. This feature enhances usability by keeping the most recent information in view.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
