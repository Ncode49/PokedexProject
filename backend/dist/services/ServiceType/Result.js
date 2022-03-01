"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo(t) {
    if (t.type === "t1") {
        console.log(t.value);
    }
    if (t.type === "t3") {
        console.log(t.error);
    }
}
