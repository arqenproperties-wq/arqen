import "./globals.css";


export const metadata = {
  title: "Arqen Properties ",
  description: "Arqen Properties is a leading real estate agency in Dubai specializing in luxury homes for sale, apartments for rent, and off-plan properties across prime locations like Dubai Marina, Palm Jumeirah, Dubai Land and Downtown Dubai",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`} suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
