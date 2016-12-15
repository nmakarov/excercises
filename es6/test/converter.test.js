import Converter from "../lib/converter";
import test from "ava";

test("works", (t) => {
	const c = new Converter(20);
	t.is(c.mt, 22);
});
