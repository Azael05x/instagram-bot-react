import * as React from "react";
import { shallow } from "enzyme";
import { Badge } from "./Badge";

describe("badge", () => {
    it("should render", () => {
        const subject = shallow(<Badge label="foo" />);
        expect(subject).toHaveLength(1);
        expect(subject.text()).toBe("foo");
    });
});
