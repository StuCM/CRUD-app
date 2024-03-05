import HomeView from "@/views/HomeView.vue";
import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';

describe("HomeView", () => {
    it("renders the table", () => {
        const wrapper = mount(HomeView);
        console.log(wrapper.html());
        expect(wrapper.find("table").exists()).toBe(true);
    })
});