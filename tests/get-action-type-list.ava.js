import AvaTest from "./_base-ava-test";
const { test, nodePlop } = new AvaTest(__filename);

const plop = nodePlop();

test("custom actions show in the list", function (t) {
  plop.setActionType("foo", () => {});

  const list = plop.getActionTypeList();

  t.true(list.includes("foo"));
});

test("default actions are present", function (t) {
  const list = plop.getActionTypeList();

  t.true(list.includes("add"), "add");
  t.true(list.includes("modify"), "modify");
  t.true(list.includes("addMany"), "addMany");
  t.true(list.includes("append"), "append");
});
