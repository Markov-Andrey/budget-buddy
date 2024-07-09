<template>
    <div class="p-4 sm:ml-64">
      <div v-if="investmentData.length > 0">
          <table>
              <thead>
              <tr>
                  <th>Инвестиции</th>
                  <th>Количество</th>
                  <th>Сумма вложений, $</th>
                  <th>Усредненная стоимость за единицу, $</th>
                  <th>Текущая цена, $</th>
                  <th>На дату</th>
                  <th>Оценка портфеля на текущую дату</th>
                  <th>% прибыли/убытков</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in investmentData" :key="item.investment_type_id"
                  :class="{'negative-row': item.latest_percent < 0, 'positive-row': item.latest_percent >= 0}
              ">
                  <td>
                      <span>{{ item.investment_type_name }}</span>
                      <span v-if="item.investment_type_code"> ({{ item.investment_type_code }})</span>
                  </td>
                  <td>{{ item.total_size }}</td>
                  <td>{{ item.total_value }}</td>
                  <td>{{ item.average_cost_per_unit }}</td>
                  <td>{{ item.latest_price }}</td>
                  <td>{{ item.latest_price_date }}</td>
                  <td>{{ item.latest_amount }}</td>
                  <td :class="{'negative': item.latest_percent < 0, 'positive': item.latest_percent >= 0}">
                      {{ item.latest_percent < 0 ? item.latest_percent : '+' + item.latest_percent }}
                  </td>
              </tr>
              <tr>
                  <td>Сумма</td>
                  <td>-</td>
                  <td>{{ sumInvestmentData }}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{{ sumInvestmentCurrentData }}</td>
                  <td>-</td>
                  <td>-</td>
              </tr>
              </tbody>
          </table>
      </div>
      <div v-else>
          No Investment Data Available
      </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios-instance";

export default {
    name: "InvestmentPage",
    data() {
        return {
            investmentData: [],
            sumInvestmentData: 0,
            sumInvestmentCurrentData: 0
        };
    },
    async mounted() {
        try {
            const response = await axiosInstance.get('/investment/show');
            console.log('Investment success:', response.data);
            this.fillDataArrays(response.data);
        } catch (error) {
            console.error('Investment error:', error);
        }
    },
    methods: {
        fillDataArrays(data) {
            this.investmentData = data.investmentData;
            this.sumInvestmentData = data.sumInvestmentData;
            this.sumInvestmentCurrentData = data.sumInvestmentCurrentData;
        }
    }
}
</script>

<style scoped>
  tr {
    border-bottom: 1px solid #b6d0cd;
  }
  .positive-row {
      transition: background-color .2s;
      background-color: #f1fff8;
      &:hover {
          background-color: #d7ffe7;
      }
  }

  .negative-row {
      transition: background-color .2s;
      background-color: #fffdfa;
      &:hover {
          background-color: #fff4d8;
      }
  }
  .negative {
      color: red;
  }

  .positive {
      color: green;
  }
</style>
