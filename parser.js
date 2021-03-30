const rp = require('request-promise')
const $ = require('cheerio')

const options = {
  method: 'GET',
  url: 'https://prd-anl-dmo.openemis.org/chart/list/?pageIndex=0&sortColumn=changed_on_delta_humanized&sortOrder=desc&viewMode=table',
  form: {
      'username': 'Admin',
      'password': 'demo',
      'csrf_token': 'ImNkNDdmMDQ0ODZiMjZmY2RhODg5YzM4ZTY5MzAzOTdlZDA2Mjc5MjYi.YGKvng.hBb2X1GdyyOlBfeNnCEyBOkg-Bw'

  },
  headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': 'session=.eJwtj0GOAjEMBP-S8xwcx3FsPjNK7Fi7WgTSDJwQfydIe-9qVb3SHsc8f9LlcTznlvZfT5eUiRFjSFHKakWgR5XotSuHWzdX9JzJpJq35oKzctTGhGA1mhlVBVFVhvXjUjK5smQdwLmL44CKKl61BbBIdkNhGJSDUDqlLdl5xP64_83b8jGnNSQSHshh3kW-WpO1QNE2HRibIi_uerd-nYtZ4Jae5zz-k9L7A2puQSk.YGKvAw.edzFwGWMJRdsfoxRVrst7JmUynA',
      'referer': 'https://prd-anl-dmo.openemis.org/superset/explore/?form_data={"queryFields":{"groupby":"groupby","metric":"metrics"},"datasource":"13__table","viz_type":"pie","slice_id":81,"url_params":{},"time_range_endpoints":["inclusive","exclusive"],"granularity_sqla":"OrderDate","time_range":"No+filter","groupby":["ProductLine"],"metric":{"aggregate":"SUM","column":{"column_name":"Sales","description":null,"expression":null,"filterable":true,"groupby":true,"id":917,"is_dttm":false,"optionName":"_col_Sales","python_date_format":null,"type":"DOUBLE+PRECISION","verbose_name":null},"expressionType":"SIMPLE","hasCustomLabel":false,"isNew":false,"label":"(Sales)","optionName":"metric_3sk6pfj3m7i_64h77bs4sly","sqlExpression":null},"adhoc_filters":[],"row_limit":null,"pie_label_type":"key","number_format":"SMART_NUMBER","donut":true,"show_legend":false,"show_labels":true,"labels_outside":true,"label_line":true,"color_scheme":"supersetColors","outerRadius":65,"innerRadius":41'
    }
  }

rp(options)
  .then((html) => {
    console.log(html)
  })