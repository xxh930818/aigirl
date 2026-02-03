/// <reference types="vite/client" />

declare module '*.moc3' {
  const content: string;
  export default content;
}

declare module '*.moc' {
  const content: string;
  export default content;
}

declare module '*.json3' {
  const content: any;
  export default content;
}