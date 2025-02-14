export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Adjust paths based on your project
    theme: {
      extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
  };