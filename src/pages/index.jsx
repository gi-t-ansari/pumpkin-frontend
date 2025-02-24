import { Suspense, lazy } from "react";

/*--------------ALL LAZY IMPORTS-------------------*/
const LazySignup = lazy(() => import("./Signup"));
const LazyChat = lazy(() => import("./Chat"));

/*--------------ALL EXPORTS-------------------*/
export const Signup = (props) => (
  <Suspense fallback={<>Loader...</>}>
    <LazySignup {...props} />
  </Suspense>
);
export const Chat = (props) => (
  <Suspense fallback={<>Loader...</>}>
    <LazyChat {...props} />
  </Suspense>
);
