export type ErrorS = {
  message: string;
};
type T1 = {
  type: "t1";
  value: string;
};

type T2 = {
  type: "t2";
};

type T3 = {
  type: "t3";
  error: string;
};
type T = T1 | T2 | T3;

function foo(t: T): void {
  if (t.type === "t1") {
    console.log(t.value);
  }

  if (t.type === "t3") {
    console.log(t.error);
  }
}
