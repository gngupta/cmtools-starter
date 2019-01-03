import { mount, createLocalVue } from '@vue/test-utils'
import Menu from '@/components/Menu'
import createClient from '@/services/apollo'
import VueApollo from 'vue-apollo';

const localVue = createLocalVue()
// const apolloProvider = createClient();
localVue.use(VueApollo);



describe('Menu', () =>{
  const wrapper = mount(Menu, {
    propsData:{
      getCategories:''
    },
    localVue,
    mocks:{
      $apolloProvider:createClient()
    }
  });

  it('renders the correct default output', () => {
    expect(wrapper.html()).toMatch("<div id=\"footer\">FOOTER</div>")
  })
})