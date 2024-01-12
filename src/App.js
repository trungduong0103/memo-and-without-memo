import React from "react";
import "./styles.css";

// References
// React.memo: https://react.dev/reference/react/memo#minimizing-props-changes
// Generate random color: https://css-tricks.com/snippets/javascript/random-hex-color/

function ExpensiveChild() {
  let startTime = performance.now();
  while (performance.now() - startTime < 1000) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return <p>I'm VERY expensive to render</p>;
}

const MemoizedExpensiveChild = React.memo(ExpensiveChild);

function Child() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <li style={{ backgroundColor: randomColor }}>
      I change color when my parent is tickled
    </li>
  );
}

const MemoizedChild = React.memo(
  () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return (
      <li style={{ backgroundColor: randomColor }}>
        I <strong>don't</strong> change color when my parent is tickled
      </li>
    );
  }
  // for demo
  // () => false
);

function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="parentWrapper">
      <p>
        These are my kids, you can{" "}
        <button onClick={() => setCount((prevCount) => ++prevCount)}>
          tickle me
        </button>{" "}
      </p>
      <p>Im tickled {count} times </p>
      <Child />
      <Child />
      {/* <MemoizedChild /> */}
      {/* <ExpensiveChild /> */}
      <MemoizedExpensiveChild />
    </div>
  );
}

function ParentWithChildren({ children }) {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>These are my children, they will not change color when I'm tickled:</p>
      {children}
      <p>Tickle count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tickle me</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Parent />
      {/* <br />
      <ParentWithChildren>
        <Child />
        <MemoizedChild />
      </ParentWithChildren> */}
    </div>
  );
}
