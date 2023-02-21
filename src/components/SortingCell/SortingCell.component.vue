<template lang="pug">
.az-sorting-cell(
  :class="getClass"
  @click="onClick")

  az-icon.handleIcon(
    v-if="activeHandle"
    name="order" scale="1.5")
  //- .handle(
  //-   v-if="!settingsActive")

  //- .handle(
  //-   v-if="!isHeader && activeHandle")
  //-   az-icon(name="order" scale="1.5")

  //- .handle--header(
  //-   v-if="isHeader && activeHandle")
  //-   az-icon(name="order" scale="1.5")

  .az-sorting-cell__content(
    v-if="!$slots.custom")
    .az-sorting-cell__content__title(
      v-if="!settingsActive || !editMode"
      @click="activeEditMode")
      | {{ localName }}

    .az-sorting-cell__content__title(
      v-show="settingsActive && editMode")
      form(@submit.prevent="onSubmit")
        input.az-sorting-cell__content__title--input(
          :id="`input-item-${itemID}`"
          :disabled="!editMode"
          ref="name"
          :maxlength="maxlength"
          :minlength="minlength"
          @keyup.enter="onEnter"
          @blur="onBlur"
          v-model="localName")

    .az-sorting-cell__content__subtitle(
      v-if="validation")
      | {{validation}}
  .az-sorting-cell__content(
    v-else)
    slot(name="custom")

    .az-sorting-cell__content__subtitle(
      v-if="validation")
      | {{validation}}




  //- .editButton(
  //-   v-if="settingsActive && !editMode"
  //-   @click="activeEditMode")
  //-   az-icon.az-icon--linght(name="edit2" scale="1")

  //- .editButton(
  //-   v-if="settingsActive && editMode"
  //-   @click="saveChanges")
  //-   az-icon.az-icon--success(name="save" scale="1")

</template>

<script>
export default {

  props: {
    name: {
      type: String,
      required: false
    },

    validation: {
      type: String,
      default: ''
    },

    itemID: {
      type: [String, Number],
      required: false
    },

    settingsActive: {
      type: Boolean,
      default: false
    },

    activeHandle: {
      type: Boolean,
      default: true
    },

    isHeader: {
      type: Boolean,
      default: false
    },

    maxlength: {
      type: Number,
      required: false,
    },

    minlength: {
      type: Number,
      required: false,
    },

    keyboardAdjust: {
      type: Boolean,
      default: false
    }

  },

  data() {
    return {
      localName: this.name,
      editMode: false,
      debounceActive: false,
      isAndroid: this.$constants.IS_MOBILE === 'android'
    }
  },

  watch: {
    name(newValue){
      this.localName = newValue;
    },
  },

  computed:{
    getClass() {
      return [{ 'handle': this.activeHandle === true || this.$slots.custom,
                'az-sorting-cell--settingsActive': this.settingsActive === true,
                'az-sorting-cell--header': this.isHeader === true,
                'az-sorting-cell--handleActive': this.activeHandle === true}]
    }
  },

  methods: {
    initialState() {

      if(this.isAndroid && this.keyboardAdjust && this.itemID) {
        const cell = document.getElementById(this.itemID);
        const input = document.getElementById(`input-item-${this.itemID}`);
        // El contenedor sobre el que hacer scroll, si no es main (caso genérico), será
        //  main-override (en vista InstallationSort) o "sortingZones", en
        // la vista de ordenar zonas.
        const container = document.getElementsByClassName("main")[0] ?
          document.getElementsByClassName("main")[0] :
          (document.getElementsByClassName("sortingZones")[0] ?
            document.getElementsByClassName("sortingZones")[0] :
            document.getElementsByClassName("main-override")[0]);


        input.addEventListener('focus', () => {
          document.body.classList.add('keyboard-up');
          // Si la celda está por debajo de la mitad de la pantalla, entonces
          // hacemos el scroll del teclado
          if(cell.getBoundingClientRect().top >= container.clientHeight / 2) {
            // setTimeout(() => {
              if(container !== null){
                container.scrollTo(0, container.scrollHeight);
              }
            // }, 100)
          }
        });

        input.addEventListener('blur', () => {
          // setTimeout(() => {
            document.body.classList.remove('keyboard-up')
          // }, 500);
        });



      }
    },

    activeEditMode() {
      if(!this.settingsActive) return;

      this.editMode = true;
      // Next Tick nos asegura que se ha habilitado el campos antes de tomar el foco
      this.$nextTick(() => this.$refs.name.focus());

      this.$emit('focus');
    },

    onSubmit() {
      this.saveChanges();
    },
    // Manejamos blur del formulario de nombre para guardar datos
    onBlur(){
      this.onSubmit();
    },
    // Manejamos tecla enter del formulario de nombre para guardar datos
    onEnter(){
      this.$refs.name.blur();
    },

    onClick(e) {
      this.$emit('click', e);
    },

    saveChanges() {
      // Aplicamos un pequeño retardo para evitar rebotes.
      // Al guardar esperamos 200ms antes de permitir activar "activeEditMode"
      // setTimeout(() => {
      //   this.debounceActive = false;
      // }, 200)
      // this.editMode = false;
      if(this.name === this.localName){
        this.editMode = false;
        this.$emit('save', null);
        return;
      }
      // console.log("Guardando", this.localName);

      // Incluímos un pequeño retardo para que de tiempo a validar
      // desde el componente padre antes de desactivar la edición
      this.$emit('save', {id: this.itemID, name: this.localName});

      setTimeout(() => {
        if(!this.validation){
          this.editMode = false;
        }
      }, 500)
    }
  },

  mounted() {
    this.$nextTick(() => this.initialState());
  }
}
</script>

<style lang="scss" src="./SortingCell.component.scss"></style>
