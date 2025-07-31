declare module "@style-types" {
    export namespace Tailwind {
      type Colors = "blue" | "red" | "green" | "yellow" | "gray" | "indigo" | "purple" | "pink" | "teal" | "orange"
      type Shades = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
      type TextColor = `text-${Colors}-${Shades}`
      type BackgroundColor = `bg-${Colors}-${Shades}`
    }
  }