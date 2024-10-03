@import "~/assets/scss/_fonts.scss";
@import "~/assets/scss/_colors.scss"

<template>
  <div class="page-container">
    <div class="header">
        <h1> Date: {{currentDate}}</h1>
        <div class=" title">
        <h2> Title </h2>
        </div>
      </div>
  
      <div class="content">
        <div class="skills">
        <p>Skill Used: <span class="skill-item">{{ skill }}</span></p>
    </div>
    <div class="summary">
        <h1>Summary:</h1>
        <p>{{ summary }}</p>
        </div>
        <div class="dropdown">
    <div @click="toggleDropdown" class="dropdown-toggle">
      History
    </div>
    <div v-if="isOpen" class="dropdown-content">
      <div class="scrollable-area">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
      </div>
    </div>
  </div>
       
      </div>
      </div>
    
  </template>
  
  <script setup lang="ts">
 
  
 const currentDate = computed(() => {
    const today = new Date();
    return today.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  });
 


  const skill = "idk";
 const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
  const summary = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
 

  </script>
  
  <style scoped lang="scss">
  @use "~/assets/scss/summary.scss";
  </style>
  
  