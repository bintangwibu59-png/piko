@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 43 30% 90%;
    --foreground: 25 45% 12%;
    --card: 43 30% 90%;
    --card-foreground: 25 45% 12%;
    --popover: 43 30% 90%;
    --popover-foreground: 25 45% 12%;
    --primary: 25 45% 23%;
    --primary-foreground: 43 30% 93%;
    --secondary: 43 24% 75%;
    --secondary-foreground: 25 45% 12%;
    --muted: 43 24% 75%;
    --muted-foreground: 28 15% 36%;
    --accent: 9 55% 50%;
    --accent-foreground: 43 30% 93%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 25 30% 78%;
    --input: 25 30% 78%;
    --ring: 9 55% 50%;
    --radius: 0.5rem;
    --sidebar-background: 43 24% 75%;
    --sidebar-foreground: 25 45% 12%;
    --sidebar-primary: 9 55% 50%;
    --sidebar-primary-foreground: 43 30% 93%;
    --sidebar-accent: 43 30% 90%;
    --sidebar-accent-foreground: 25 45% 12%;
    --sidebar-border: 25 30% 78%;
    --sidebar-ring: 9 55% 50%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-[#EAE4D8] text-[#2C1E10] antialiased;
    font-family: 'Inter', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .font-display {
    font-family: 'Abril Fatface', serif;
  }
  .font-serif-display {
    font-family: 'DM Serif Display', serif;
  }
  .font-mono-data {
    font-family: 'DM Mono', monospace;
  }
}
