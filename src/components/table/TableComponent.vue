<template>
  <div class="relative w-full overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
    <table class="w-full">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th v-for="(header, index) in headers" :key="index" scope="col" class="px-6 py-3">
          {{ header }}
        </th>
        <th scope="col" class="px-6 py-3"><span class="sr-only">Edit</span></th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, index) in data"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
          <td class="px-6 py-4">
              <img :src="`${apiUrl}/${item.image_path}`" alt="Receipt Image" class="w-16 h-16">
          </td>
        <td class="px-6 py-4">{{ item.processed }}</td>
        <td class="px-6 py-4">{{ item.error }}</td>
        <td class="px-6 py-4">{{ item.annulled }}</td>
        <td class="px-6 py-4">{{ item.amount }}</td>
        <td class="px-6 py-4 text-right flex gap-2">
            <router-link v-if="isShow" :to="`/show/${item.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</router-link>
            <router-link v-if="isEdit" :to="`/edit/${item.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
            <router-link v-if="isDelete" :to="`/delete/${item.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  data() {
      return {
          apiUrl: process.env.VUE_APP_API_URL + 'storage/',
      };
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style scoped>
</style>
