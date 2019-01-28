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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.firstName.required" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.lastName.required" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.streetName.required" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.streetNumber.required" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.postalCode.required" 
                class="error">{{ $t('component.address.required.postalCode') }}</label>
              <label 
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.postalCode.postalCodeValidator" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.city.required" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.country.required" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.phone.required" 
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
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.email.required" 
                class="error">{{ $t('component.address.required.email') }}</label>
              <label 
                v-if="addressSubmit.status === StatusEnum.ERROR && !$v.email.email" 
                class="error">{{ $t('component.address.invalid.email') }}</label>
            </div>

            <!-- submit button -->
            <div class="form-group">
              <v-btn 
                :disabled="addressSubmit.status === StatusEnum.PENDING"
                color="success"
                type="submit"
              >{{ $t('common.form.save') }}</v-btn>
            </div>
          </form>
        </div>
        <v-alert
          :value="addressSubmit.status === StatusEnum.ERROR"
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
import { required, email } from 'vuelidate/lib/validators'
import cart from '@/dao/cart-dao';
import Status from '@/misc/status';

//postal code validator
const postalCodeValidator = (value) => /\d{4}[ ]?[A-Z]{2}/.test(value) || (value === '') || (value === null)

export default {
  name: 'Address',
  data() {
    return {
      StatusEnum: Object.assign({}, Status()),
      addressSubmit: {
        status: null, //a bit useless due translations
        error: ''
      },
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
  methods: {
    save() {
      let cartId = this.$store.getters.cart.id;
      let version = this.$store.getters.cart.version;
    
      //checks the form with Vuelidate
      if(this.$v.$invalid) {
        this.addressSubmit.status = this.StatusEnum.ERROR;
        return;
      }

      //updates the status to pending
      this.addressSubmit.status = this.StatusEnum.PENDING;
         
      //preparing parameters for graphql query
      let params = {
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

      //execute query -> add address to cart
      cart('updateAddress', params, this).then((data) => {
        //update cart, submitstatus and redirects you to the confirmation page
        this.$store.commit('setCart', data.data.updateMyCart);
        this.addressSubmit.status = this.StatusEnum.OK;
        this.$emit('addressSaved');

      }).catch((/*err*/) => {
        this.addressSubmit.status = this.StatusEnum.ERROR;

      });
    }
  }
}
</script>

<style>
.form__input,
.form__label {
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
