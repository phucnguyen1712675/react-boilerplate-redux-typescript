import { lazy, ReactChild, ReactFragment, ReactPortal, Suspense } from 'react';

interface Opts {
  fallback: boolean | ReactChild | ReactFragment | ReactPortal | null;
}
type Unpromisify<T> = T extends Promise<infer P> ? P : never;

const lazyLoad = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Promise<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  U extends React.ComponentType<any>
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: Opts = { fallback: null }
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then((module) => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return function LazyLoadComponent(
    props: React.ComponentProps<U>
  ): JSX.Element {
    return (
      <Suspense fallback={opts.fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default lazyLoad;
