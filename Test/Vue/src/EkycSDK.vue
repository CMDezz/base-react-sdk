<template>
  <div>
    <div is="savvy-sdk-comp"></div>
  </div>
</template>
<script>
  export default {
  mounted() {

    const ekycInstance = new window.EkycInstance();

    ekycInstance.initialize({
      core: {
        API_KEY: "123",
      },
    });
    ekycInstance.render();
  }
}
    </script>