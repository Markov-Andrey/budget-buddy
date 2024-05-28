<template>
  <div>Добавить новый чек</div>
  <TableComponent is-edit />
</template>

<script>
import TableComponent from "@/components/table/TableComponent";
export default {
  name: "ReceiptsPage",
  components: {TableComponent}
}
</script>

<style scoped>

</style>