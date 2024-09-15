
<template>
    <div class="message">
      <div class="message-box">
        <label for="options">What skill have you used today? </label>
        <select v-model="selectedOption" id="options" :disabled="isDisabled">
          <option v-for="option in options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <button @click="finalizeSelection">Finalize Selection</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedOption: '', 
        finalizedOption: '', 
        isDisabled: false, 
        options: [
          'Active Listening',
          'Accountability',
          'Constructive Feedback',
          'Collaboration',
          'Conflict Resolution',
          'Inclusive Leadership',
          'Stress Management',
          'Delegation',
          'Critical Thinking',
          'Interpersonal Communication',
          'Conflict Resolution',
          'Time Management',
          'Adaptability'
        ]
      };
    },
    methods: {
      finalizeSelection() {
        this.finalizedOption = this.selectedOption;
        this.isDisabled = true; 
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  @use "~/assets/scss/dropdown.scss";
  </style>
  
  
  
  
  
  
  
  