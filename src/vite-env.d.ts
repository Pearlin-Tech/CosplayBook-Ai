/// <reference types="vite/client" />
/// <reference types="@react-three/fiber" />

declare module "*.jpg" {
    const src: string;
    export default src;
  }
  declare module "*.png" {
    const src: string;
    export default src;
  }
  declare module "*.svg" {
    const src: string;
    export default src;
  }
  declare module "*.css?url" {
    const src: string;
    export default src;
  }