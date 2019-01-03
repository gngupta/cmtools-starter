import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer'



describe('Footer', () =>{
  const wrapper = shallowMount(Footer, {
    propsData:{
    }
  });

  it('renders the correct default output', () => {
    expect(wrapper.html()).toMatch("<div id=\"footer\">FOOTER</div>")
  })
})