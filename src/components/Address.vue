<template>
  <v-container>
    <v-layout 
      row 
      wrap>
      <v-flex xs12>
        <div class="form-wrapper">
          <form @submit.prevent="save">
            <!-- Firstname input field -->
            <div 
              :class="{ 'form-group--error': $v.firstName.$error }" 
              class="form-group">
              <input 
                id="fName" 
                v-model.trim="firstName" 
                :placeholder="$t('component.address.placeholder.firstName')"
                type="text" 
                class="form__input form-control">
              <label 
                v-if="submitStatus === 'ERROR' && !$v.firstName.required" 
                class="error">{{ $t('component.address.required.firstName') }}</label>
            </div> 
            
            <!-- Lastname input field -->
            <div 
              :class="{ 'form-group--error': $v.lastName.$error }" 
              class="form-group">
              <input 
                id="lName" 
                v-model="lastName" 
                :placeholder="$t('component.address.placeholder.lastName')"
                type="text" 
                class="form__input form-control">
              <label 
                v-if="submitStatus === 'ERROR' && !$v.lastName.required" 
                class="error">{{ $t('component.address.required.lastName') }}</label>
            </div>

            <!-- Streetname input field -->
            <div 
              :class="{ 'form-group--error': $v.streetName.$error }" 
              class="form-group">
              <input 
                id="sName" 
                v-model="streetName" 
                :placeholder="$t('component.address.placeholder.streetName')"
                type="text" 
                class="form__input form-control" >
              <label 
                v-if="submitStatus === 'ERROR' && !$v.streetName.required" 
                class="error">{{ $t('component.address.required.streetName') }}</label>
            </div>

            <!-- Streetnumber input field -->
            <div 
              :class="{ 'form-group--error': $v.streetNumber.$error }" 
              class="form-group">
              <input 
                id="sNumber" 
                v-model="streetNumber" 
                :placeholder="$t('component.address.placeholder.streetNumber')"
                type="text" 
                class="form__input form-control" >
              <label 
                v-if="submitStatus === 'ERROR' && !$v.streetNumber.required" 
                class="error">{{ $t('component.address.required.streetNumber') }}</label>
            </div>

            <!-- AdditionalStreetInfo input field -->
            <div class="form-group">
              <input 
                id="sInfo" 
                v-model="additionalStreetInfo" 
                :placeholder="$t('component.address.placeholder.additionalStreetInfo')"
                type="text" 
                class="form__input form-control" >
            </div>

            <!-- Postalcode input field -->
            <div 
              :class="{ 'form-group--error': $v.postalCode.$error }" 
              class="form-group">
              <input 
                id="pCode" 
                v-model="postalCode" 
                :placeholder="$t('component.address.placeholder.postalCode')"
                type="text" 
                class="form__input form-control" >
              <label 
                v-if="submitStatus === 'ERROR' && !$v.postalCode.required" 
                class="error">{{ $t('component.address.required.postalCode') }}</label>
              <label 
                v-if="submitStatus === 'ERROR' && !$v.postalCode.postalCodeValidator" 
                class="error">{{ $t('component.address.invalid.postalCode') }}</label>
            </div>

            <!-- City input field -->
            <div 
              :class="{ 'form-group--error': $v.city.$error }" 
              class="form-group">
              <input 
                id="City" 
                v-model="city" 
                :placeholder="$t('component.address.placeholder.city')"
                type="text" 
                class="form__input form-control" >
              <label 
                v-if="submitStatus === 'ERROR' && !$v.city.required" 
                class="error">{{ $t('component.address.required.city') }}</label>
            </div>

            <!-- Country input field -->
            <div 
              :class="{ 'form-group--error': $v.country.$error }" 
              class="form-group">
              <select 
                id="Country" 
                v-model="country" 
                :placeholder="$t('component.address.placeholder.country')"
                class="form__input form-control" >
                <option 
                  :value="null" 
                  disabled>{{ $t('component.address.selectOne') }}</option>
                <option 
                  v-for="countryOption in countries" 
                  :value="countryOption.value" 
                  :key="countryOption.value">{{ countryOption.text }}</option>
              </select>
              <label 
                v-if="submitStatus === 'ERROR' && !$v.country.required" 
                class="error">{{ $t('component.address.required.country') }}</label>
            </div>
            
            <!-- Phonenumber input field -->
            <div 
              :class="{ 'form-group--error': $v.phone.$error }" 
              class="form-group">
              <input 
                id="Phone" 
                v-model="phone" 
                :placeholder="$t('component.address.placeholder.phone')"
                type="text" 
                class="form__input form-control" >
              <label 
                v-if="submitStatus === 'ERROR' && !$v.phone.required" 
                class="error">{{ $t('component.address.required.phone') }}</label>
            </div>

            <!-- Email input field -->
            <div 
              :class="{ 'form-group--error': $v.email.$error }" 
              class="form-group">
              <input 
                id="Email" 
                v-model="email" 
                :placeholder="$t('component.address.placeholder.email')"
                type="text" 
                class="form__input form-control" >
              <label 
                v-if="submitStatus === 'ERROR' && !$v.email.required" 
                class="error">{{ $t('component.address.required.email') }}</label>
              <label 
                v-if="submitStatus === 'ERROR' && !$v.email.email" 
                class="error">{{ $t('component.address.invalid.email') }}</label>
            </div>

            <!-- submit button -->
            <div class="form-group">
              <v-btn 
                :disabled="submitStatus === 'PENDING'"
                color="success"
                type="submit"
              >{{ $t('common.form.save') }}</v-btn>
            </div>
          </form>
        </div>
        <v-alert
          :value="alert"
          type="error"
          transition="scale-transition"
        >
          {{ $t('common.form.notCorrect') }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { required, email } from 'vuelidate/lib/validators'

//postal code validator
const postalCodeValidator = (value) => /\d{4}[ ]?[A-Z]{2}/.test(value) || (value === '') || (value === null)

export default {
  name: 'Address',
  data() {
    return{
      alert: false,
      submitStatus: null,
      countries: [
        { text: "The Netherlands", value: "NL" }
      ],
      firstName: null,
      lastName: null,
      streetName: null,
      streetNumber: null,
      additionalStreetInfo: null,
      postalCode: null,
      city: null,
      phone: null,
      email: null,
      country: null
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    streetName: {
      required
    },
    streetNumber: {
      required
    }, 
    postalCode: {
      required,
      postalCodeValidator
    },
    city: {
      required
    },
    country: {
      required
    },
    phone: {
      required
    },
    email: {
      required,
      email
    }
  },
  methods:{
    save(){
      let cartId = this.$store.getters.cart.id;
      let version = this.$store.getters.cart.version;
    
      //checks the form with Vuelidate
      if(this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        this.alert = true;
        this.$refs.addressFormError.show()
        return;
      }
      this.alert = false;
      this.submitStatus = 'PENDING';
            
      this.$apollo.mutate({
        mutation: gql`mutation addAddressToCart($cartId: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) {
                    updateMyCart(id: $cartId, version: $version, actions: $actions) {
                        id
                        version
                        customerEmail
                        lineItems {
                            id
                            quantity
                            productId
                            name(locale: $locale)
                            productSlug(locale: $locale)
                            totalPrice {
                                centAmount
                                currencyCode
                            }
                            variant{
                                images{
                                    url
                                }
                            }
                        }
                        totalPrice {
                            currencyCode
                            centAmount
                        }
                        shippingAddress{
                            firstName
                            lastName
                            streetName
                            streetNumber
                            additionalStreetInfo
                            postalCode
                            city
                            country
                        }
                    }
                }`,
        // Parameters
        variables: {
          locale: this.$store.getters.language,
          cartId: cartId,
          customerEmail :this.email,
          version: version,
          actions: [{
            setShippingAddress: {
              address: {
                firstName: this.firstName,
                lastName: this.lastName,
                streetName: this.streetName,
                streetNumber: this.streetNumber,
                additionalStreetInfo: this.additionalStreetInfo,
                postalCode: this.postalCode,
                city: this.city,
                phone: this.phone,
                email: this.email,
                country: this.country
              }
            }
          }]
        }
      }).then((data) =>{
        this.$store.commit('setCart', data.data.updateMyCart);
        this.submitStatus = "OK";
        this.$emit('addressSaved')
      }).catch((error) =>{
        //should we use b-modal here? (errors didn't exist anymore, so I removed this line.)
        console.log(error);
      })
    },
    hideAddressFormError() {
      this.$refs.addressFormError.hide();
    }
  }


}
</script>

<style>
.form__input, .form__label {
  margin: 5px 5px;
}

.form-group {
    margin: auto;
    width: 350px;
    text-align: left;
}

.form-wrapper {
    margin: 30px;
}

.form-control {
  float: left;
}

#inputStreet {
  width: 100%;
}

#streetNumber {
  width: 8%;
}

#additionalStreetInfo {
  width: 28%;
}
#postalCode {
  width: 20%;
}
#city {
  width: 30%;
}
#country {
  width: 15%;
}

#inputZip {
  width: 28%;
}

#inputCounty {
  width: 45%;
}

#inputCountry {
  width: 50%;
}

.addAddress {
  background: #c83b3b;
  border: 1px solid transparent;
  color: #fff;
}
.addAddress:hover {
  background: #e9944f;
  color: #fff;
}

.error {
    color: #c83b3b;
}
</style>
