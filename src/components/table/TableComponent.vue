<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
    <table>
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
        <td class="px-6 py-4">{{ item.name }}</td>
        <td class="px-6 py-4">{{ item.color }}</td>
        <td class="px-6 py-4">{{ item.category }}</td>
        <td class="px-6 py-4">{{ item.price }}</td>
        <td class="px-6 py-4 text-right flex gap-2">
          <router-link v-if="isShow" to="`/edit/${item.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</router-link>
          <router-link v-if="isEdit" to="`/edit/${item.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
          <router-link v-if="isDelete" to="`/edit/${item.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    headers: {
      type: Array,
      default: () => ["Product name", "Color", "Category", "Price"]
    },
    data: {
      type: Array,
      default: () => [
        { id: 1, name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
        { id: 2, name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
        { id: 3, name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
      ]
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
  }
}
</script>

<style scoped>
</style>
