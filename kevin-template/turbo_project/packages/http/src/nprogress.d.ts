declare module 'nprogress' {
  const nprogress: {
    start: () => void;
    done: () => void;
    configure: (options: any) => void;
  };
  export default nprogress;
}