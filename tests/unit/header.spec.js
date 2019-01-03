import { shallowMount, createLocalVue } from '@vue/test-utils'
import Header from '@/components/Header'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Header with minicart', () =>{
  const wrapper = shallowMount(Header, {
    propsData:{
      showCart:true
    },
    localVue
  });

  it('renders the correct output with the minicart', () => {
    expect(wrapper.html()).toMatch("<section class=\"top-bar cf\"><div id=\"header\"><bcontainer-stub tag=\"div\"><brow-stub tag=\"div\"><bcol-stub tag=\"div\">Wunderman shop</bcol-stub> <bcol-stub tag=\"div\"><languageswitch-stub></languageswitch-stub><minicart-stub></minicart-stub></bcol-stub></brow-stub> <brow-stub tag=\"div\"><bcol-stub tag=\"div\"><menu-stub></menu-stub></bcol-stub></brow-stub></bcontainer-stub></div></section>")
  })
})

describe('Header without the minicart', () =>{
  const wrapper = shallowMount(Header, {
    propsData:{
      showCart:false
    }
  });

  it('renders the correct output without the minicart', () => {
    expect(wrapper.html()).toMatch("<section class=\"top-bar cf\"><div id=\"header\"><b-container><b-row><b-col>Wunderman shop</b-col> <b-col><languageswitch-stub></languageswitch-stub><span>&nbsp;</span></b-col></b-row> <b-row><b-col><menu-stub></menu-stub></b-col></b-row></b-container></div></section>")
  })
})