<template>
  <div>Добавить новый чек</div>
  <ReceiptInputComponent />
  <TableComponent is-edit />
</template>

<script>
import TableComponent from "@/components/table/TableComponent";
import ReceiptInputComponent from "@/components/inputs/ReceiptInputComponent";
export default {
  name: "ReceiptsPage",
  components: {ReceiptInputComponent, TableComponent}
}
</script>

<style scoped>

</style>