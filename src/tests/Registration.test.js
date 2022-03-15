import "jsdom-global/register";
import { shallow, mount } from "enzyme";
import "../../enzymeConfig.js";
import React from "react";
import renderer from "react-test-renderer";
import RegistrationForm from "../console/RegistrationForm.js";

describe("<Login/>", () => {
  const component = renderer.create(<RegistrationForm />).toJSON();
  it("should match the snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("should render a email input tag", () => {
    const wrapper = shallow(<RegistrationForm />);
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
  });

  it("should render a password input tag", () => {
    const wrapper = shallow(<RegistrationForm />);
    expect(wrapper.find('input[name="password"]').exists()).toBe(true);
  });

  it("should render a submit button", () => {
    const wrapper = shallow(<RegistrationForm />);
    expect(wrapper.find('button[name="button"]').exists()).toBe(true);
  });

  it("the default value for both fields should be empty", () => {
    const wrapper = shallow(<RegistrationForm />);
    expect(wrapper.find('input[name="email"]').prop("value")).toBe("");
    expect(wrapper.find('input[name="password"]').prop("value")).toBe("");
  });

  it("on change of value in the field, the state of that field in the component should be updated", () => {
    const wrapper = shallow(<RegistrationForm />);

    wrapper.find('input[name="firstName"]').simulate("change", {
      target: {
        value: "firstname",
      },
    });
    expect(wrapper.find('input[name="firstName"]').prop("value")).toBe(
      "firstname"
    );
    wrapper.find('input[name="lastName"]').simulate("change", {
      target: {
        value: "lastname",
      },
    });
    expect(wrapper.find('input[name="lastName"]').prop("value")).toBe(
      "lastname"
    );

    wrapper.find('input[name="email"]').simulate("change", {
      target: {
        value: "email@gmail.com",
      },
    });
    expect(wrapper.find('input[name="email"]').prop("value")).toBe(
      "email@gmail.com"
    );
    wrapper.find('input[name="password"]').simulate("change", {
      target: {
        value: "Test@1234",
      },
    });
    expect(wrapper.find('input[name="password"]').prop("value")).toBe(
      "Test@1234"
    );
  });

  //   it("on submitting, a submit handler function should be triggered on click event", () => {
  //     const fn = jest.fn();
  //     const wrapper = mount(<RegistrationForm onSubmit={fn} />);
  //     wrapper.find("form").simulate("click");
  //     expect(fn.mock.calls.length).toEqual(0);
  //   });
});
